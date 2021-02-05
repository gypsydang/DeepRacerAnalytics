import {LineData} from './line-data';
import {Step} from '../step';

export class YawData extends LineData {

  private throttle = 100;

  constructor(label: string, displayName: string) {
    super(label, displayName);
  }

  handleData(steps: Step[]): Step[] {
    const data = super.handleData(steps);

    for (let i = 0; i < data.length - 1; i++) {
      if (this.isOverflow(this.getYaw(data[i]), this.getYaw(data[i + 1]))) {
        const d = data[i + 1] as any;
        d.yaw = -Math.abs(d.yaw) + 360;
        console.log(d.yaw);
      }
    }

    return data;
  }

  private isOverflow(yaw: number, yaw2: number): boolean {
    return Math.abs(yaw - yaw2) >= this.throttle;
  }

  private getYaw(data: any): number {
    return Number(data.yaw);
  }
}
