import { ReportData2DLine } from './report-data-2D-line';

export class ReportData2D {
    caption: String;
    xCoordinateLabel: String;
    yCoordinateLabel: String;
    totalValue: String;
    totalValueLabel: String;
    values: ReportData2DLine[];
  }