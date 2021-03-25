import React from 'react';

const TYPE_MUTE_CAMERA = 'camera';
const TYPE_MUTE_MIC = 'mute-mic';
const TYPE_SCREEN = 'screen';
const TYPE_LEAVE = 'leave';
const TYPE_CHAT = 'chat';

/**
 * Props:
 * - type: string
 * - highlighted: boolean
 */
export default function Icon(props) {
  function getFillColor() {
    return props.highlighted ? '#fb5554' : '#000000';
  }

  function getPath() {
    switch (props.type) {
      case TYPE_MUTE_CAMERA:
        return (
          <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Assets-for-Export"
              transform="translate(-24.000000, 0.000000)"
              fill={getFillColor()}
            >
              <g
                id="Icon-Camera-Off-24px"
                transform="translate(24.000000, 0.000000)"
              >
                <path
                  d="M13.7573593,6 L4.00585866,6 C2.89706013,6 2,6.8992496 2,8.0085302 L2,15.9914698 C2,16.4835828 2.17760958,16.9352259 2.47229113,17.2850682 L13.7573593,6 Z M16,12.2426407 L16,15.9914698 C16,17.1007504 15.1029399,18 13.9941413,18 L10.2426407,18 L16,12.2426407 Z M16,12.2426407 L16,14.499966 L21.0756492,16.6148096 C21.586154,16.8275189 22,16.5442917 22,16.0045612 L22,7.99539512 C22,7.44565489 21.5875957,7.17183667 21.0756492,7.38514669 L20.7016702,7.54097052 L16,12.2426407 Z M20.4877316,2.09805481 C20.8769027,1.70888376 21.506248,1.70725811 21.8994949,2.10050506 C22.2900192,2.49102936 22.2956069,3.1186067 21.9019452,3.51226838 L3.51226838,21.9019452 C3.12309732,22.2911162 2.49375202,22.2927419 2.10050506,21.8994949 C1.70998077,21.5089706 1.70439313,20.8813933 2.09805481,20.4877316 L20.4877316,2.09805481 Z"
                  id="Combined-Shape"
                ></path>
              </g>
            </g>
          </g>
        );
      case TYPE_MUTE_MIC:
        return (
          <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Assets-for-Export"
              transform="translate(-120.000000, 0.000000)"
              fill={getFillColor()}
            >
              <g
                id="Icon-Microphone-Off-24px"
                transform="translate(120.000000, 0.000000)"
              >
                <path
                  d="M15.8931049,12.3495358 L15.8883757,12.354265 C15.7702192,12.7237203 15.5976472,13.0928313 15.3634551,13.4334743 C14.9080287,14.0959127 14.281481,14.5761112 13.4232304,14.8194102 L11,17.2426407 L11,18.9906311 C11,18.9937578 11.0000137,18.9968808 11.0000409,19 L9.99077797,19 C9.45097518,19 9,19.4477153 9,20 C9,20.5561352 9.44358641,21 9.99077797,21 L14.009222,21 C14.5490248,21 15,20.5522847 15,20 C15,19.4438648 14.5564136,19 14.009222,19 L12.9999626,19 C12.999986,18.9968804 13,18.9937574 13,18.9906311 L13,16.9383953 C14.793746,16.7093537 16.1268712,15.8533183 17.0115375,14.566531 C17.631941,13.6641258 17.9116422,12.769082 17.9922726,12.124039 C18.0567667,11.6080864 17.715976,11.1348845 17.2185349,11.0241058 L17.2162194,11.0264213 C17.1758852,11.0160463 17.1430789,11.0101085 17.12403,11.0077274 C16.5760096,10.9392248 16.076219,11.3279514 16.0077165,11.8759725 C15.9990827,11.9450424 15.9659776,12.1062504 15.8970768,12.3267333 C15.8944966,12.3349898 15.8931939,12.3425837 15.8931049,12.3495358 Z M14.8100942,4.94726512 C14.3837386,3.80970165 13.2864273,3 12,3 C10.3431458,3 9,4.34314575 9,6 L9,10.7573593 L14.8100942,4.94726512 Z M7.97590142,11.7814579 C7.86511978,11.2840207 7.39191988,10.9432336 6.87596978,11.0077274 C6.32795032,11.0762298 5.93922497,11.5760196 6.0077274,12.124039 C6.05291889,12.4855709 6.16064541,12.9256367 6.35584336,13.401516 L7.97590142,11.7814579 Z M20.4877316,2.09805481 C20.8769027,1.70888376 21.506248,1.70725811 21.8994949,2.10050506 C22.2900192,2.49102936 22.2956069,3.1186067 21.9019452,3.51226838 L3.51226838,21.9019452 C3.12309732,22.2911162 2.49375202,22.2927419 2.10050506,21.8994949 C1.70998077,21.5089706 1.70439313,20.8813933 2.09805481,20.4877316 L20.4877316,2.09805481 Z"
                  id="Combined-Shape"
                ></path>
              </g>
            </g>
          </g>
        );
      case TYPE_SCREEN:
        return (
          <path
            fill={getFillColor()}
            fillRule="evenodd"
            d="M2 5.006C2 3.898 2.898 3 3.99 3h16.02C21.108 3 22 3.897 22 5.006v9.988A2.003 2.003 0 0 1 20.01 17H3.99C2.892 17 2 16.103 2 14.994V5.006zm2 .99v8.009c0 .54.448.995 1 .995h14c.555 0 1-.446 1-.995v-8.01c0-.54-.448-.995-1-.995H5c-.555 0-1 .446-1 .995zM7 20c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 7 20z"
          />
        );
      case TYPE_LEAVE:
        return (
          <path
            d="M19.347 11l-1.71-1.638a.832.832 0 0 1 0-1.222l.03-.03a.922.922 0 0 1 1.27-.003l3.34 3.2a.95.95 0 0 1 0 1.386l-3.34 3.2a.918.918 0 0 1-1.27-.003l-.03-.03a.842.842 0 0 1 0-1.221L19.348 13h-7.352A.995.995 0 0 1 11 12c0-.552.456-1 .995-1h7.352zM16 10h-2V7.995c0-.54-.446-.995-.997-.995H6.997A1 1 0 0 0 6 7.995v8.01c0 .54.446.995.997.995h6.006a1 1 0 0 0 .997-.995V14h2v2.994A2.009 2.009 0 0 1 13.991 19H6.01A2.007 2.007 0 0 1 4 16.994V7.006C4 5.898 4.902 5 6.009 5h7.982C15.101 5 16 5.897 16 7.006V10z"
            fill={getFillColor()}
            fillRule="evenodd"
          />
        );
      case TYPE_CHAT:
        return (
          <path
            d="M8.984 17.522c.93.308 1.949.478 3.016.478 4.418 0 8-2.91 8-6.5S16.418 5 12 5s-8 2.91-8 6.5c0 1.65.756 3.156 2.003 4.302a8.751 8.751 0 0 1-.71 2.187c-.317.606-.457 1.011 0 1.011 1.727 0 1.99-1.236 3.691-1.478z"
            fill={getFillColor()}
            fillRule="evenodd"
          />
        );
      default:
        throw new Error();
    }
  }

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {getPath()}
    </svg>
  );
}

export { TYPE_MUTE_CAMERA, TYPE_MUTE_MIC, TYPE_SCREEN, TYPE_LEAVE, TYPE_CHAT };
