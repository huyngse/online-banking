declare type SearchParamProps = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string | string[] | undefined }
}

declare type SignUpParams = {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    email: string;
    password: string;
}

declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    user: string;
    subtext?: string;
}

declare interface TotalBalanceBoxProps {
    accounts: Account[];
    totalBanks: number;
    totalCurrentBalance: number;
}

declare interface DoughnutChartProps {
    accounts: Account[];
}