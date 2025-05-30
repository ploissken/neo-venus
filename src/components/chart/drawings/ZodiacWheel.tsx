import {
  defaultDividerColor,
  defaultSignColors,
  DividerColors,
  SignColors,
} from "@/lib/chart";
import { motion } from "framer-motion";

const CHART_DEFAULT_VIEWBOX_SIZE = 800;
const DEFAULT_ROTATION = 0;

interface ZodiacWheelProps {
  dividerColors?: DividerColors;
  signColors?: SignColors;
  size?: number;
  rotationDegrees?: number;
}

const defaultProps = {
  dividerColors: defaultDividerColor,
  signColors: defaultSignColors,
  size: CHART_DEFAULT_VIEWBOX_SIZE,
  rotationDegrees: DEFAULT_ROTATION,
};

export function ZodiacWheel(props: ZodiacWheelProps) {
  const propsWithDefault = {
    ...defaultProps,
    ...props,
    dividerColors: {
      ...defaultProps.dividerColors,
      ...props.dividerColors,
    },
    signColors: {
      ...defaultProps.signColors,
      ...props.signColors,
    },
  };

  const { dividerColors, signColors, size, rotationDegrees } = propsWithDefault;

  const center = size / 2;
  const scaleFactor = size / CHART_DEFAULT_VIEWBOX_SIZE;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      animate={{ rotate: rotationDegrees }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <circle
        id="outer-circle"
        fill="#333"
        cx={center}
        cy={center}
        r={0.49 * size}
      />

      <g
        id="dec-angles"
        stroke={dividerColors.degree}
        strokeMiterlimit={10}
        transform={`scale(${scaleFactor})`}
      >
        <line x1="455.5" y1="83.5" x2="453.5" y2="100.5" />
        <line x1="510.5" y1="97.5" x2="504.5" y2="113.5" />
        <line x1="426.5" y1="85.5" x2="425.5" y2="96.5" />
        <line x1="481.5" y1="95.5" x2="478.5" y2="105.5" />
        <line x1="532.5" y1="115.5" x2="528.5" y2="124.5" />
        <line x1="606.5" y1="153.7" x2="596.04" y2="167.25" />
        <line x1="646.46" y1="194" x2="633.09" y2="204.64" />
        <line x1="580.61" y1="140.49" x2="574.09" y2="149.41" />
        <line x1="622.62" y1="177.37" x2="614.91" y2="184.4" />
        <line x1="656.07" y1="220.76" x2="649.5" y2="225.5" />
        <line x1="703.27" y1="291.03" x2="687.43" y2="297.53" />
        <line x1="717.74" y1="345.9" x2="700.84" y2="348.43" />
        <line x1="687.43" y1="266.65" x2="677.33" y2="271.11" />
        <line x1="705.4" y1="319.58" x2="695.2" y2="321.82" />
        <line x1="712.69" y1="373.88" x2="702.88" y2="374.75" />
        <line x1="82.4" y1="344.23" x2="99.4" y2="346.23" />
        <line x1="96.4" y1="289.23" x2="112.4" y2="295.23" />
        <line x1="84.4" y1="373.23" x2="95.4" y2="374.23" />
        <line x1="94.4" y1="318.23" x2="104.4" y2="321.23" />
        <line x1="114.4" y1="267.23" x2="123.4" y2="271.23" />
        <line x1="152.6" y1="193.22" x2="166.15" y2="203.68" />
        <line x1="192.91" y1="153.26" x2="203.54" y2="166.64" />
        <line x1="139.4" y1="219.12" x2="148.32" y2="225.64" />
        <line x1="176.27" y1="177.1" x2="183.3" y2="184.82" />
        <line x1="219.66" y1="143.66" x2="225.32" y2="151.72" />
        <line x1="289.93" y1="96.46" x2="296.44" y2="112.29" />
        <line x1="344.81" y1="81.99" x2="347.33" y2="98.89" />
        <line x1="265.55" y1="112.29" x2="270.02" y2="122.39" />
        <line x1="318.48" y1="94.32" x2="320.72" y2="104.52" />
        <line x1="372.78" y1="87.04" x2="373.65" y2="96.85" />
        <line x1="343.93" y1="716.25" x2="345.93" y2="699.25" />
        <line x1="288.93" y1="702.25" x2="294.93" y2="686.25" />
        <line x1="372.93" y1="714.25" x2="373.93" y2="703.25" />
        <line x1="317.93" y1="704.25" x2="320.93" y2="694.25" />
        <line x1="266.93" y1="684.25" x2="270.93" y2="675.25" />
        <line x1="192.93" y1="646.05" x2="203.39" y2="632.5" />
        <line x1="152.97" y1="605.75" x2="166.35" y2="595.12" />
        <line x1="218.83" y1="659.26" x2="225.34" y2="650.34" />
        <line x1="176.81" y1="622.38" x2="184.53" y2="615.35" />
        <line x1="143.37" y1="579" x2="150.5" y2="573.5" />
        <line x1="96.17" y1="508.73" x2="112" y2="502.22" />
        <line x1="81.69" y1="453.85" x2="98.59" y2="451.32" />
        <line x1="112" y1="533.11" x2="122.1" y2="528.64" />
        <line x1="94.03" y1="480.17" x2="104.23" y2="477.94" />
        <line x1="86.74" y1="425.88" x2="96.55" y2="425" />
        <line x1="717.03" y1="455.53" x2="700.03" y2="453.53" />
        <line x1="703.03" y1="510.53" x2="687.03" y2="504.53" />
        <line x1="715.03" y1="426.53" x2="704.03" y2="425.53" />
        <line x1="705.03" y1="481.53" x2="695.03" y2="478.53" />
        <line x1="685.03" y1="532.53" x2="676.03" y2="528.53" />
        <line x1="646.83" y1="606.53" x2="633.28" y2="596.07" />
        <line x1="606.53" y1="646.49" x2="595.89" y2="633.11" />
        <line x1="660.03" y1="580.63" x2="651.12" y2="574.12" />
        <line x1="623.16" y1="622.65" x2="616.13" y2="614.93" />
        <line x1="579.77" y1="656.09" x2="575.5" y2="648.5" />
        <line x1="509.5" y1="703.29" x2="503" y2="687.46" />
        <line x1="454.63" y1="717.77" x2="452.1" y2="700.87" />
        <line x1="533.88" y1="687.46" x2="529.41" y2="677.36" />
        <line x1="480.95" y1="705.43" x2="478.71" y2="695.23" />
        <line x1="426.65" y1="712.72" x2="425.78" y2="702.91" />
      </g>
      <circle
        id="middle-circle"
        fill="#555"
        cx={center}
        cy={center}
        r={0.38 * size}
      />
      <g
        id="house-dividers"
        stroke={dividerColors.house}
        transform={`scale(${scaleFactor})`}
      >
        <line x1="203.5" y1="60.5" x2="258.5" y2="155.5" />
        <line x1="399.5" y1="7.5" x2="398.5" y2="117.5" />
        <line x1="596.5" y1="60.5" x2="540.5" y2="154.5" />
        <line x1="739.5" y1="202.5" x2="643.5" y2="256.5" />
        <line x1="792.5" y1="400.5" x2="682.5" y2="399.5" />
        <line x1="740.5" y1="595.5" x2="644.5" y2="541.5" />
        <line x1="596.5" y1="739.5" x2="542.5" y2="645.5" />
        <line x1="399.5" y1="792.5" x2="399.5" y2="682.5" />
        <line x1="204.5" y1="740.5" x2="257.5" y2="643.5" />
        <line x1="59.5" y1="594.5" x2="155.5" y2="541.5" />
        <line x1="7.5" y1="400.5" x2="117.5" y2="400.5" />
        <line x1="60.5" y1="203.5" x2="155.5" y2="258.5" />
      </g>
      <circle
        id="inner-circle"
        fill="#222"
        cx={center}
        cy={center}
        r={0.355 * size}
      />
      <g id="signs" transform={`scale(${scaleFactor})`}>
        <path
          id="virgo"
          fill={signColors.earth}
          d="M759.18,477.8c-1,.57,3.52,3.78,3.85,4.13,1.52,1.56,3.75,6.01,4.02,8.17.59,4.78-4.43,6.59-8.23,7.52,2.71,7.61-.06,14.14-8.99,13.04-.96-.12-4.61-1.35-5.11-.67-1.34,1.84,3.15,8.38-.17,11.72-1.64,1.65-5,1.95-7.15,1.38-6.72-1.78-12.42-4.58-17.19-9.7-1.45-1.56-3.75-6.9-5.7-7.2-2.28-.36-4.84,3.78-4.93,5.72-.04.78,2.85,6.78-.67,5.49-1.92-.7-2.8-5.56-2.43-7.38.3-1.46,1.43-3.93,2.36-5.1.68-.86,2.67-1.76,2.73-2.77.02-.45-3.15-6.85-3.57-8.17-.28-.88-1.05-3.86-.27-4.45.92-.15,1.2.33,1.76.92,2.14,2.27,4.33,9.29,6.97,10.4,2.24.94,3.53-.17,5.56-.39,7.59-.82,18.03,4.54,25.5,6.3,2.5.59,7.54.49,8.46-2.45,1.19-3.8-1.86-9.44-5.55-10.84-6.55-2.47-14.51-3.45-21.22-5.75-1.87-.85-2.12-1.8-1.5-3.74.4-.34,2.15-.18,2.72-.09,3.28.54,9.37,1.6,12.34,2.53,4.02,1.27,8.56,4.17,12.69,5.7,1.38.51,4.38,1.64,5.68,1.8,1.03.12,2.09-1.2,2.45-2.05.75-1.76-.38-3.87-1.66-5.1-4.86-4.64-11.16-8.55-17.45-10.96-3.31-1.27-6.66-.83-9.78-2.94-1.41-.95-4.41-3.73-2.3-5.31,1.58-.29,3.04.61,4.52.9,2.85.56,4,.96,6.67,1.8,7.68,2.43,18.15,3.94,26.25,3.79,2.93-.06,7.08.18,8.53-2.85.81-1.71.34-4.69,2.48-4.24,2.33,4.38.23,7.7-3.97,9.57-5.44,2.42-11.94,1.23-17.71,1.3ZM741.41,519.17c-.42-2.57-.18-5.2-1.15-7.67-1.68-4.26-7.21-5.6-11.29-6.34-1.33-.24-7.3-1.14-8.06-.07-1.07,4.41,3.83,7.65,7.09,9.77,3.75,2.43,8.46,4.87,12.99,4.78l.43-.47Z"
        />
        <path
          id="capricorn"
          fill={signColors.earth}
          d="M321.65,49.63c.22.12,2.84-2.76,3.33-3.13,7.14-5.38,13.84-.16,13.7,8.02-.02.99-.45,4.06-.81,4.9-1.7,3.96-10.23,7.35-13.89,4.4-.35.27.23,4.98.21,5.93-.07,3.66-1.75,7.4-4.03,10.23-1.48,1.83-5.81,3.4-8.11,3.64-.87.09-1.59-.62-2.48-.16-.91-2.43,3.65-2.23,5.29-2.9,6.63-2.7,6.48-13.31,5.93-19.22-.95-10.25-3.74-20.35-8.92-29.32-1.62-2.8-4-3.77-6.78-1.74-4.62,3.37-6.48,10.12-6.35,15.62.18,7.57,1.57,13.89,3.72,21.14.73,2.45,2.48,4.89-1.61,5.58l-.3-.26c-1.08-5.46-4.1-10.15-6.39-15.11-2.59-5.6-4.64-11.87-8.62-16.69-3.95-4.8-5.88-3.32-9.36,1.02-1.99-.32-.06-3.55.67-4.54,2.92-3.99,5.6-3.15,9.22-.56,3.21,2.3,5.14,6.56,6.75,10.15.95,2.11,1.58,4.5,2.51,6.58.14.32.12.68.65.63-.56-3.18-1.26-7-.86-10.22.33-2.65,3.04-10.25,4.38-12.6,1.98-3.47,4.69-5.16,8.78-5.29,2.76-.09,4.67,1.86,6.28,3.9,3.59,4.58,7.26,12.42,7.37,18.28.01.68-.08,1.1-.3,1.73ZM327.05,48.79c-2.21.92-4.42,3.98-4.54,6.37-.05.97,1.06,4.99,1.53,5.8,1.26,2.19,6.4,1.48,7.97.05.88-.81,2.16-5.24,2.05-6.44-.37-3.71-2.89-7.48-7-5.77Z"
        />
        <path
          id="scorpio"
          fill={signColors.water}
          d="M664.99,132.86c.29.6.6.44,1.12.43,4.08-.1,8.33-3.23,11.31,2.4,1.42,2.68,1.09,4.77-.41,7.23-3.18,5.21-7.59,8.37-10.68,12.84-1.61,2.34-2.41,5.29-3.87,7.63-1.64,2.62-6.72,7.48-4,10.98.19.25,5.3,2.35,5.73,2.44.65.14,3.44-.04,4.3-.1,10.26-.75,16.19-3.88,25.54-7.45.95-.36,2.13-.21,2.81-1.09-.03-2.27-7.24-5.91-6.11-7.87,1.21-2.1,4.28.83,5.41,1.83,1.69,1.49,5.26,4.76,6.58,6.38.68.84.87,1.66,1.24,2.62l-10.64,11.59c-.56.39-2.95.17-2.78-.82l6.05-8.81c-3.18,1.48-6.6,2.35-9.89,3.53-3.63,1.31-4.49,2.12-8.64,2.75-2.88.44-6.87,1.23-10.01,1.24-3.81.01-9.75-.48-12.65-3.07-3.85-3.44-1.88-9.94.17-13.9,1.43-2.76,4.61-8,6.45-10.46,2.4-3.21,13.1-10.9,12.12-15.02-.43-1.81-5.88-1.35-7.43-1-8.14,1.85-17.12,10.92-23.61,15.91-1.46,1.12-7.4,3.61-6.55.1.41-1.72,4.29-4.68,5.66-6.12,1.8-1.9,3.39-4.13,5.34-5.9,4.39-3.99,10.46-7.51,14.51-11.63,4.83-4.91.3-5.92-4.3-5.17-11.73,1.91-16.11,6.76-24.46,14.15-2.33,2.06-7.4,5.57-9,1.19l26.81-27.53.56.45c.68-2.53,3.31-3.14,4.17-.17,1.08,3.7-5.63,7.49-7.84,9.65l9.44-1.91c1.92-.2,7.82-.51,9.31.48,3.87,2.57,2.1,10.19-1.76,12.18Z"
        />
        <path
          id="pisces"
          fill={signColors.water}
          d="M44.86,275.74c-.19,1.86-1.81,3.2-2.32,4.82-1.45,4.59,2.12,11.97,5.78,14.78,3.99,3.08,9.34,3.87,14.04,5.44l.81-.61c.12-1.4,1.74-9.67,3.83-9,1.72.55-.18,4.42-.38,5.45-.16.82-.85,5.31-.65,5.58.22.26.52.35.83.45.85.27,9.08-.38,10.5-.57,4.52-.61,7.53-2.59,8.25-7.41.3-1.99-.93-5.15,1.18-6.42,1.33.02,1.87,4.32,1.92,5.4.16,3.23-.74,9.02-3.23,11.18-2.78,2.42-9.21,1.79-12.72,1.86-2.33.04-5.26,1.09-7.16-.62l-1.15,3.8c3.07,1.83,6.89,2.44,9.54,5.1,3.5,3.51,5.66,12.85,4.33,17.56-.87,3.11-4.98,10.43-8.97,8.85.64-3.63,3.6-6.38,4.65-9.84,1.5-4.95-1.07-14.3-5.79-16.78-.85-.45-4.29-1.33-4.74-.69-.35.49-.2,1.73-.41,2.48-.5,1.75-2.6,10.97-5.34,8.3-.77-2.16,1.3-4.6,1.86-7.08.38-1.69.82-4.29-.58-5.5-2.14-1.86-3.01-.89-5.23-1.24-6.05-.94-10.62-2.19-16.63-2.31-3.07-.06-5.75-.15-6.08,3.76-.22,2.58,4.89,6.37,1.28,7.76-3.86,1.48-6.3-7.87-5-10.75.33-.72,1.26-1.51,1.93-1.93,5.8-3.61,19.72-1.81,26.38-.77.81.13,4.5,1.27,4.75,1.24,1.45-.13,1.4-3.5.96-3.68-6.2.56-17.18-4.89-20.61-10-2.51-3.74-3.71-11.45-1.61-15.49,1.02-1.98,3.5-4.28,5.8-3.12Z"
        />
        <path
          id="taurus"
          fill={signColors.earth}
          d="M105.8,642.45c.87-.05,5.04,1.96,6.47,2.32,10.47,2.63,19.84-4.27,30.99-1.49.51.13.72.25,1.54.44s1.49.77,2.37.6c.15-4.83-3.87-8.31-1.56-13.11s7.63-8.22,13.1-7.97c9.58.45,25.32,12.93,19.67,23.26-2.51,4.59-5.98,6.56-11,7.5-2.3.43-7.48-.26-8.59,2.1-.45.95,2.06,6.04,2.36,7.65.6,3.15-1.37,9.9-2.78,12.83-1.54,3.19-4.52,5.87-2.04,9.68.97,1.5,4.05,2.98,2.45,4.77-2.16,2.41-6.91-1.93-6.42-5.84,1.2-9.65,7.12-16.67,3.44-27.1-2.59-7.35-5.05-8.41-12.29-10.21-11.01-2.73-17.14,2-27.36,1.23-2.32-.17-11.98-2.03-11.91-4.77.2-.75.68-1.84,1.58-1.89ZM154.66,648.71c2.93,1.85,10.62,2.69,13.49.56,5.02-3.72,7.02-11.58,3.38-16.89-2.85-4.15-13.4-7.19-17.72-3.98-6.35,4.72-5.89,16.06.85,20.31Z"
        />
        <path
          id="sagittarius"
          fill={signColors.fire}
          d="M519.25,67.52c-1.36.78-3.66.45-3.02-1.86,1.27-4.63,4.98-10.3,6.34-15.18l3.26-5.92c-5.43,1.08-10.2,4.62-15.35,6.15-2.23.66-4.91.76-7.13,1.41-1.37.4-2.99,1.61-4.68,1.72l8.99,16.21.03.84c-1.04.91-1.72.98-2.92.26-1.26-.75-6.04-8.07-7.04-9.77-1.14-1.96-1.96-4.23-2.97-6.26l-21.38,6.35c-.48.05-1.16.04-1.87-.25-.36-.14-1.59-.62-1.86-1.71-.03-.13-.17-.7.12-1.15.35-.55,1.15-.58,1.33-.65,2.73-1.07,5.52-2.01,8.23-3.12,4.14-1.7,7.95-4.54,12.74-3.94.62-.38-.6-3.98-.91-4.75-.81-2.02-3.51-5.29-2.79-7.53.68-2.13,2.04-.99,3.05.24,1.15,1.4,4.77,11.25,5.51,11.41,4.51-2.56,9.62-3.31,14.46-4.92,3.81-1.27,7.64-2.76,11.44-4.12.66-.24,1.72.22,1.35-.77-4.02-.65-7.42-2.44-11.12-3.76-4.8-1.71-10.52-3.35-15.09-5.58-2.57-1.25-.9-4.22.64-4.01,5.82,2.17,11.9,3.64,17.72,5.82,5.01,1.88,9.86,4.32,14.86,6.24,1.29.4,1.63,1.61,1.29,2.83-.16.56-1.84,4.3-2.23,4.95-2.97,5.05-4.77,8.12-7.23,13.6-.69,1.53-2.62,6.57-3.77,7.22Z"
        />
        <path
          id="leo"
          fill={signColors.fire}
          d="M663.2,641.37c-1.52.05-2.21-4.33-3-5.43-.93-1.28-2.66-2.87-4.37-2.19-4.89,1.97.64,5.57,3.11,6.83,2.64,1.34,6.09,1.78,8.79,3.12,8.55,4.23,14.82,17.89,8.06,26.06-5.39,6.5-14,4.96-20.66,1.35-3.36-1.82-2.6-2.5-4.67-4.68-.55-.58-1.36-.78-1.81-1.27-4.56-4.98-4.82-12.5-7.51-18.33-1.16-2.51-3.96-7.2-6.23-8.76-2.14-1.47-5.5,3.49-6.13,5.43-1,3.05,3.02,5.68,1.93,7.76-1.76,3.34-4.86-2.18-5.76-3.87-1.74-3.28-1.68-5.82.65-8.81.89-1.14,5.16-4.02,6.46-4.34,1.88-.47,5.54.74,7.24,1.64,13.48,7.14,6.84,28.2,22.55,33.15,9.18,2.9,15.16-5.93,11.06-13.99-1.65-3.24-4.94-5.63-8-7.58-5.39-3.43-13.39-3.79-13.99-11.5-.18-2.32,1.84-6.57,4.39-6.74,1.45-.1,6.92,2.7,8.02,3.76,1.84,1.78,3.54,8.27-.12,8.4Z"
        />
        <path
          id="gemini"
          fill={signColors.air}
          d="M303.41,727.77c-3.61-2.07-4.49-6.49-6.61-9.23-1.71-2.22-4.52-2.89-1.48-6.27l1.41.48c1.8,3.68,4.21,7.25,7.42,9.84,3.41,2.75,10.45,4.85,14.85,5.04,3.43.15,5.2-2.36,7.94-3.78.79-.41,4.52-2.06,5.01-1.27-1.32,5.93-8.97,7.34-14.05,8.57-.99,3.44-2.51,6.75-3.43,10.24-1.52,5.81-2.16,12.12-3.31,18.02,0,1.2,5.09,5.4,6.11,7.6.78,1.68,1.8,8.59-.4,9.26-2.69.83-2.19-5.8-2.56-7.14-2-7.11-19.33-10.56-25.01-7.32-1.77,1.01-6.15,7.11-7.84,6.04-2.84-1.78,3.26-8.64,5-9.84,1.14-.79,2.26-1.16,3.59-1.5,1.54-.4,4.62-.37,5.71-.78,2.23-.84,2.14-8.97,3.54-11.12.07-4.3,1.6-8.16,2.72-12.18.44-1.56,1.07-3.08,1.41-4.66ZM301.2,756.86c.36.43,4.93,1.44,5.75,1.43.52,0,.64-.21.86-.63.55-4.75,1.66-9.4,2.49-14.1.49-2.74.44-6.24,1.28-8.84.41-1.24,1.51-2.43,1.65-3.89l-5.39-.86c-2.43,3.9-4.6,7.97-5.19,12.6-.31,2.46-.54,4.96-.82,7.41-.26,2.28-.37,4.6-.63,6.88Z"
        />
        <path
          id="aries"
          fill={signColors.fire}
          d="M88.27,482.07l.11,1.04c-3.25,1.17-6.68,1.98-9.96,3.1-6.39,2.18-13.27,4.42-19.55,6.81-4.18,1.59-13.69,5.17-16.87,7.64-2.51,1.94-6.8,6.99-5.1,10.31.29.57,2.69,2.38,1.3,2.9s-4.31-3.73-4.42-5.2c-.33-4.74,6.25-13.32,10.2-15.7,4.27-2.57,9.88-4.26,14.81-4.82-.29-.79-.57-.44-1.05-.38-1.16.14-2.28.48-3.52.5-4.5.08-18.85-1.57-22.27-4.08-1.39-1.01-3.86-4.74-3.95-6.43-.18-3.41,2.84-7.07,5.59-8.78.9-.56,4.18-2.51,4.65-.82.53,1.89-4.66,3.76-5.51,5.1-1.56,2.46,2.19,7.36,4.53,8.44,6.95,3.21,26.98,1.77,35.12,1.33,1.9-.1,15.39-1.58,15.88-.95Z"
        />
        <g id="aquarius" fill={signColors.air}>
          <path d="M150.51,130.48c.95.04,4.51.22,4.8-.67l-.58-25.04c3.46-.33,4.28,2.85,4.41,5.64.21,4.59.03,11.63-.23,16.28-.13,2.42-.71,5.28-.86,7.77-.74,1-7.82-.56-9.22-.76s-3.27,0-4.65-.29c-2.21-.47-4.66-2.02-6.98-2.29,1.96,3.39,2.22,7.38,3.21,11.11.86,3.23,3.13,6.75,2.16,10.34l-21.75-1.92c1.65,3.14,1.51,6.94,2.35,10.21.91,3.55,4.06,7.84,1.55,11.23-.4-.42-1.22-.4-1.58-.74-.83-.77-2.75-6.91-3.23-8.42-.74-2.33-3.78-13.92-2.6-15.52l21.19,1.02c-.08-2.19-1.92-3.42-2.68-5.42-1.08-2.86-1.06-6.82-1.89-9.82-.36-1.31-3.01-6.98-2.68-7.49.34-.46.84-.25,1.29-.11,1.71.54,4.09,2.05,5.95,2.69,3.41,1.18,8.41,2.07,12.02,2.22Z" />
          <path d="M177.11,118.03c5.52,2.35,3.88,8.38,4.29,13.02s1.91,9.69,1.81,14.21c-.02.87-.17,2.11-1.28,2.06-6.64-.39-13.28.54-19.9-.74.89,2.61,1.5,5.4,2.32,8,.62,1.95,3.43,7.46,2.25,9.06-.46.62-1.29.73-1.97.92-7.38,2.07-11.7.25-18.6.62-1.65.09-4.73.27-5.19,2.08-.09.34.23,6.02.29,6.98.21,3.74.79,7.5,1.09,11.24-2.59,2.82-3.96-1.49-4.39-3.74-.34-1.81-1.51-16.84-1.02-17.57,4.36-2.85,9.34-1.26,14.13-1.29,2.02-.01,5.27-.09,7.23-.28,1.62-.16,3.23-.37,4.64-1.27.06-1.93-1.42-2.94-2.09-4.43-1.06-2.34-2.46-6.07-3.27-8.52-.25-.77-1.51-5.35-1.33-5.69.2-.38.55-.6,1-.51,2.41.72,5.29,1.68,7.75,2.02,1.1.15,4.37.36,5.43.31,2.45-.12,5.26-1.86,7.95-1.82-.41-6.82-.6-13.7-1.8-20.43.53-.92-.41-4.03.66-4.24Z" />
        </g>
        <g id="cancer" fill={signColors.water}>
          <path d="M498.59,738.63c.18.05.13,1.04.95.39l-.57-.73c7.58-8.03,19.68.57,19.52,10.23-.15,9.21-8.6,18.69-17.09,21.53-10.13,3.39-16.3,3.02-25.46-2.18-1.7-.97-7.37-3.69-4.43-5.68,2.18-1.47,8.28,2.84,10.58,3.75,1.79.7,9.99,2.75,11.65,2.66,2.84-.15,13.53-4.76,15.59-6.74,1.63-1.56,3.18-5.89,3.38-8.13.48-5.41-4.11-1.88-6.77-1.23-2.39.58-5.9.92-7.93-.72-2.81-2.27-3.75-6.32-2.21-9.57.27-.57,2.48-3.68,2.8-3.58ZM500.08,743.61c-1.06,2.52-1.4,6.2,2.31,6.29,2.82.07,9.37-2.67,9.05-6.04-.09-.98-2.58-4.8-3.5-5.21-2.9-1.3-6.8,2.43-7.86,4.95Z" />
          <path d="M470.75,734.89c6.61-2.43,14.77-.11,14.44,8.14-.12,3.14-2.18,4.27-4.63,5.78-5.67,3.52-11.97,4.94-15.13-2.29-1.28-2.94-2.78-6.63-1.56-9.69,4.21-10.56,17.45-19.75,28.5-21.53,2.56-.41,5.46,1.02,7.76,1.21,1.55.13,3-.38,4.67-.13,1.18.18,4.81,1.48,4.97,2.75-.13.41-.27.65-.68.83-1.03.48-6.67-.49-8.39-.55-12-.41-22.95,3.44-29.66,14.03-.29.46-.65.85-.31,1.43ZM467.97,741.3c-.14,2.19,2.75,6.4,4.8,6.71,2.34.36,8.55-2.81,8.5-5.48-.03-1.63-3.07-5.72-4.62-5.89-.53-.06-5.23,1.02-5.8,1.31-1.5.76-1.55,2.51-2.88,3.35Z" />
        </g>
        <g id="libra" fill={signColors.air}>
          <path d="M762.46,287.66c8.1,6.65,11.13,18.37,9.23,28.42-1.19,6.31-10.63,14.51-17.04,15.46-1.92,1.83-10.63,4.14-11.78,5.57-.43.53-.04,4.97.09,6.12.1.92.69,1.64.77,2.42.15,1.36.43,6.9-2.29,6.01-.75-.42-1.17-1.25-1.42-2.04-.84-2.69-1.58-6.44-2.12-9.25-3.36-17.64-6.03-35.28-9.43-52.9-.5-2.6-4.16-12.55-.99-14.03s2.35,6.67,3.96,8.53c1.39,1.6,3.75.15,5.16-.11,8.64-1.58,18.92.11,25.85,5.8ZM732.1,287.06c.52,2.69.83,5.44,1.35,8.13,1.94,10.03,3.94,21.43,6.7,31.1.39,1.37,1.04,6.31,2.23,6.66.9.27,4.33-.85,5.28-1.32.73-.36,1.21-1.1,1.93-1.48,5.76-3.04,12.12-5.45,16.11-10.73,2.99-3.95,1.15-13.28-.49-17.61-3.36-8.9-8.09-12.98-17.4-14.31-5.17-.74-10.49-.56-15.71-.44Z" />
          <path d="M730.13,352.59c-1.18-2.23-.99-4.91-1.62-7.31-4.66-17.92-6.86-36.05-9.32-54.39-.28-2.1-.88-5.07-1.37-7.17-.43-1.88-3.57-7.25.02-7.64,1.68-.19,3.11,3.76,3.61,5.21,1.54,4.51,1.69,9.33,2.75,13.95.58,2.5,1.8,5.22,2.4,7.76,1.98,8.28,1.31,15.87,2.19,24.09.77,7.18,2.55,13.3,2.76,20.69.06,2.1,1.65,4.35-1.44,4.82Z" />
        </g>
      </g>
    </motion.svg>
  );
}
