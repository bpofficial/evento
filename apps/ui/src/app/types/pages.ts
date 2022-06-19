import * as Screens from '../screens';

type ScreenProp<T extends keyof typeof Screens> = React.ComponentProps<
    typeof Screens[T]
>;

export interface PageOption<T extends keyof typeof Screens> {
    title: string;
    type: T;
    options: ScreenProp<T>;
}

export type PageOptions =
    | PageOption<'AllEvents'>
    | PageOption<'EasyPayment'>
    | PageOption<'MultiVote'>
    | PageOption<'QuickPoll'>
    | PageOption<'ScanQR'>
    | PageOption<'SimpleVote'>;
