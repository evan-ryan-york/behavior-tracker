import { useEffect } from "react";

const generateLine = (line: number) => {
  if (line === 0) {
    return 0;
  } else if (line === 1) {
    return 30;
  } else if (line === 2) {
    return 45;
  } else if (line === 3) {
    return 60;
  } else {
    return line * 25;
  }
};

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload, ticks, setTicks } = props;
  useEffect(() => {
    setTicks((pV: number[]) => {
      if (!pV.includes(x)) {
        return [...pV, x];
      } else {
        return [...pV];
      }
    });
  }, [x, setTicks]);

  const formatText = (text: string) => {
    let spacing = 250;
    if (ticks.length > 1) {
      spacing = ticks[1] - ticks[0];
    }
    let line = 0;
    let lastCut = 0;
    let combinedText: any[] = [];
    for (let i = 0; i < text.length; i++) {
      if ((i > 0 && i % Math.round(spacing / 6) === 0) || i === text.length - 1) {
        combinedText.push(
          <tspan x={-90} y={generateLine(line)}>
            {text.slice(lastCut, i + 1).trim()}
          </tspan>
        );
        lastCut = i + 1;
        line = line + 1;
      }
    }

    return combinedText;
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#333" fontSize={13}>
        {formatText(payload.value)}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
