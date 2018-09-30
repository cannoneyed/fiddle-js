declare module 'nanotimer' {
  type Task = (...args: any[]) => void;
  type Callback = (...args: any[]) => void;
  export interface NanoTimer {
    new (): NanoTimer;

    setTimeout(task: Task, args: any[], timeout: string, callback?: Callback): void;
    setInterval(task: Task, args: any[], timeout: string, callback?: Callback): void;
    time(task: Task, args: any[], format: string, callback?: Callback): void;
    clearInterval(): void;
    clearTimeout(): void;
    hasTimeout(): boolean;
  }

  const nanotimer: NanoTimer;
  export default nanotimer;
}
