export const ReturnDetails = (props: any) => {
  const { percent, value, text, type, textSize = [24, 18] } = props;
  return (
    <div
      style={{
        minHeight: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div>
          <FormatValue value={percent} textSize={textSize[0]} type="percent" />
        </div>
        <div>
          <FormatValue value={value} textSize={textSize[1]} type={type} />
        </div>
        <div>
          <p className="text-[12px] text-[#bdbdbd]">{text}</p>
        </div>
      </div>
    </div>
  );
};

export const ReturnDetailsNoText = (props: any) => {
  const { percent, value, type, textSize = [24, 18] } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div>
          <FormatValue value={percent} textSize={textSize[0]} type="percent" />
        </div>
        <div>
          <FormatValue value={value} textSize={textSize[1]} type={type} />
        </div>
      </div>
    </div>
  );
};

export const ReturnDetailsDashboardNoText = (props: any) => {
  const { percent, value } = props;
  let textClass = "text-center";

  const checkPercent = () => {
    if (percent > 0) return "▲ ";
    else if (percent < 0) return "▼ ";
    else if (percent === 0) return "";
  };

  if (percent > 0) {
    textClass += " text-[green]";
  } else if (percent < 0) {
    textClass += " text-[red]";
  } else {
    textClass += " text-[white]";
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ margin: "5px", marginBottom: "10px" }}>
          <p className="text-[white] text-[30px] leading-1">
            ฿
            {value
              ? value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 0}
          </p>
        </div>
        <div style={{ margin: 2 }}>
          <p
            className={`${textClass}`}
            style={{ fontSize: "30px", lineHeight: "22px" }}
          >
            {checkPercent()}
            {percent
              ? percent.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export const FormatValue = (props: any) => {
  const { value, textSize, type } = props;

  const getTextClass = (value: number) => {
    let className = "text-center";
    if (value > 0) {
      className += " text-[green]";
    } else if (value < 0) {
      className += " text-[red]";
    } else {
      className += " text-[white]";
    }
    return className;
  };

  const renderValue = (value: number, symbol: string, last: string = "") => {
    const textClass = getTextClass(value);
    return (
      <p
        className={`${textClass}`}
        style={{ fontSize: textSize, lineHeight: textSize / 14 }}
      >
        {symbol}
        {value
          ? value < 0
            ? Math.abs(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
          : 0}
        {last}
      </p>
    );
  };

  if (type === "percent") {
    if (value > 0) return renderValue(value, "▲ ", "%");
    else if (value < 0) return renderValue(value, "▼ ", "%");
    else if (value === 0) return renderValue(value, "", "%");
  } else if (type === "usd") {
    return renderValue(value, "$");
  } else if (type === "thb") {
    return renderValue(value, "฿");
  } else {
    return null;
  }
};

export const OtherDetails = (props: any) => {
  const { value, text } = props;

  return (
    <div style={{ minHeight: 80, display: "flex", alignItems: "center" }}>
      <div>
        <div>
          <p className={`text-[22px] text-[white]`}>{value.toFixed(2)}</p>
        </div>
        {text.map((line: string) => (
          <div key={line}>
            <p className="text-[12px] text-[#bdbdbd]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OtherDetailsPercent = (props: any) => {
  const { value, text } = props;

  return (
    <div style={{ minHeight: 80, display: "flex", alignItems: "center" }}>
      <div>
        <div>
          <p className={`text-[22px] text-[white]`}>{value.toFixed(2)}%</p>
        </div>
        {text.map((line: string) => (
          <div key={line}>
            <p className="text-[12px] text-[#bdbdbd]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
