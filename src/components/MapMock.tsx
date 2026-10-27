import Svg, { Circle, G, Path, Rect, SvgXml } from 'react-native-svg';
import { View } from 'react-native';

import { markXml } from '@/icons/brand';

/** Illustrative city map (no real map provider in the prototype): roads, a park, the route and the guard pin. */
export function MapMock({ width, height, pin = true }: { width: number; height: number; pin?: boolean }) {
  const w = width, h = height;
  const cx = w * 0.53, cy = h * 0.6;
  return (
    <View accessibilityLabel="Карта объекта" style={{ width: w, height: h }}>
      <Svg width={w} height={h}>
        <Rect width={w} height={h} fill="#E9EAEC" />
        <Rect x={w * 0.4} y={h * 0.3} width={w * 0.26} height={h * 0.26} rx={8} fill="#D6E9D2" />
        <Rect x={w * 0.04} y={h * 0.56} width={w * 0.22} height={h * 0.1} rx={6} fill="#DADCE0" />
        <Rect x={w * 0.78} y={h * 0.3} width={w * 0.18} height={h * 0.28} rx={6} fill="#DADCE0" />
        <Rect x={w * 0.04} y={h * 0.04} width={w * 0.22} height={h * 0.18} rx={6} fill="#DADCE0" />
        <G stroke="#FFFFFF">
          <Path d={`M-10 ${h * 0.3} L${w + 10} ${h * 0.22}`} strokeWidth={14} />
          <Path d={`M-10 ${h * 0.7} L${w + 10} ${h * 0.62}`} strokeWidth={10} />
          <Path d={`M${w * 0.3} -10 L${w * 0.36} ${h + 10}`} strokeWidth={12} />
          <Path d={`M${w * 0.74} -10 L${w * 0.7} ${h + 10}`} strokeWidth={8} />
        </G>
        {pin ? (
          <G>
            <Path d={`M${w * 0.33} ${h * 0.5} C${w * 0.42} ${h * 0.5} ${w * 0.52} ${h * 0.58} ${cx} ${h * 0.64}`} stroke="#143AA8" strokeWidth={3} strokeDasharray="2 6" strokeLinecap="round" fill="none" />
            <Circle cx={cx} cy={cy} r={28} fill="#143AA8" fillOpacity={0.22} />
            <Circle cx={cx} cy={cy} r={16} fill="#0A2266" />
            <Circle cx={w * 0.33} cy={h * 0.5} r={7} fill="#FFFFFF" stroke="#143AA8" strokeWidth={3} />
          </G>
        ) : null}
      </Svg>
      {pin ? (
        <View style={{ position: 'absolute', left: cx - 9, top: cy - 9 }}>
          <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${markXml.replace(/qm/g, 'qmap')}</svg>`} width={18} height={18} color="#FFFFFF" />
        </View>
      ) : null}
    </View>
  );
}
