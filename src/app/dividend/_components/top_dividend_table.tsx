import { DataGridCustomStyle } from "@/app/_components/styled";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  Item,
  LoadPanel,
  Paging,
  Scrolling,
  SearchPanel,
  Toolbar,
} from "devextreme-react/data-grid";

export const TopDividendTable = (props: any) => {
  const RenderValue = (rowData: any) => {
    return rowData.displayValue + "%";
  };
  return (
    <DataGridCustomStyle
      id="gridContainer"
      dataSource={props.data}
      columnAutoWidth={true}
      keyExpr="year"
      allowColumnReordering={true}
      showBorders={false}
      showRowLines={true}
      showColumnLines={false}
      height={400}
    >
      <Column
        dataField="symbol"
        caption="Symbol"
        minWidth={100}
        alignment="center"
        fixed={true}
      />
      <Column
        dataField="dividendYield"
        caption="Dividend Yield"
        minWidth={100}
        alignment="center"
        cellRender={RenderValue}
      />
    </DataGridCustomStyle>
  );
};
