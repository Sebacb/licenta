using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Novell.Directory.Ldap;
using PlannerApp.Models.Authentication;
using PlannerApp.Models.Dtos;
using PlannerApp.Models.Generic;
using PlannerApp.Services.Abstractions;
using System;
using System.Net;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IResponsiblesService _responsiblesService;
        private IMeetingService _meetingService;
        private INotificationService _notificationService;

        public UsersController(IUserService userService,
                               IResponsiblesService responsiblesService,
                               IMeetingService meetingService,
                               INotificationService notificationService)
        {
            _userService = userService;
            _responsiblesService = responsiblesService;
            _meetingService = meetingService;
            _notificationService = notificationService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null && model.IsAdUser)
            {
                //pass the connectionString here
                try
                {
                    string host = "192.168.23.128";
                    string un = model.Username;
                    string pass = model.Password;
                    int port = 389;
                    int version = LdapConnection.LdapV3;
                    string searchBase = "OU=Users,DC=IT,DC=root";
                    string searchFilter = "(objectclass=*)";
                    LdapSearchConstraints constraints = new LdapSearchConstraints();
                    constraints.TimeLimit = 30000;

                    using (var conn = new LdapConnection { SecureSocketLayer = false })
                    {
                        conn.Connect(host, port);
                        conn.Bind(version, un, pass);

                        var searchResults = conn.Search(
                            searchBase,
                            LdapConnection.ScopeSub,
                            searchFilter,
                            null, // no specified attributes
                            false, // return attr and value
                            constraints);
                        var a = searchResults.HasMore();
                        while (searchResults.HasMore())
                        {
                            //count++;
                            var nextEntry = searchResults.Next();

                            nextEntry.GetAttributeSet();
                            var attr = nextEntry.GetAttribute("NAME");

                            //if (attr == null)
                            //{
                            //    users.Add("Distinguished Name", nextEntry.getAttribute("distinguishedName").StringValue);
                            //}
                            //else
                            //{
                            //    users.Add((nextEntry.getAttribute("SAMACCOUNTNAME") == null) ? "NULL ACC Name " + count : nextEntry.getAttribute("SAMACCOUNTNAME").StringValue,
                            //        (nextEntry.getAttribute("DISTINGUISHEDNAME") == null) ? "NULL DN" + count : nextEntry.getAttribute("distinguishedName").StringValue);
                            //}
                        }
                    }
                }
                catch (LdapException ldapEx)
                {
                    ldapEx.ToString(); // ocassional time outs
                }
                catch (Exception ex)
                {
                    ex.ToString();
                }
                //using (LdapConnection connection = new LdapConnection("192.168.23.128"))
                //{
                //    try
                //    {
                //        connection.AuthType = AuthType.Basic;
                //        connection.SessionOptions.ProtocolVersion = 3;
                //        var credential = new NetworkCredential(model.Username, model.Password);
                //        connection.Bind(credential);

                //        _userService.AuthenticateWithCreation(model.Username, model.Password);
                //    }
                //    catch (LdapException ex)
                //    {
                //        return BadRequest(new { message = "Username or password is incorrect" });
                //    }
                //    finally
                //    {
                //        connection.Dispose();
                //    }
                //}
            }
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpGet("getLayerInfo")]
        public IActionResult GetLayerInfo(int userId)
        {
            return Ok(_responsiblesService.GetResponsiblesFor(userId));
        }

        [PlannerApp.Helpers.Authorize]
        //[Authorize(AuthenticationSchemes = NegotiateDefaults.AuthenticationScheme)]
        //[Authorize(Roles = Role.AllRoles)]
        [HttpGet("getUserDashboardInfo")]
        public IActionResult GetUserDashboardInfo(int userId)
        {
            var dto = new DashboardDto();
            dto.Responsibles = _responsiblesService.GetResponsiblesFor(userId);
            dto.Meetings = _meetingService.GetTodaysMeetingsFor(userId);
            return Ok(dto);
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpGet("getNotificatications")]
        public IActionResult GetNotifications(int userId)
        {
            return Ok(_notificationService.GetNotifications(userId));
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpPost("dismissNotification")]
        public IActionResult DismissNotification([FromBody] DismissNotificationDto dto)
        {
            return Ok(_notificationService.DismissNotificaion(dto.UserId, dto.NotificationId));
        }

    }
}
