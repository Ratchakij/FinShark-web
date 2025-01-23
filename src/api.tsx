import axios from "axios";
import {
    CompanyBalanceSheet,
    CompanyCashFlow,
    CompanyCompData,
    CompanyIncomeStatement,
    CompanyKeyMetrics,
    CompanyProfile,
    CompanySearch,
    CompanyTenK,
} from "./company";

interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (symbol: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const apiUrl = `https://financialmodelingprep.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
        const data = await axios.get<SearchResponse>(apiUrl);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An expected error has occured.";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=50&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=20&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getCashFlow = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

// Endpoint is not available - Upgrade account
export const getCompData = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyCompData[]>(
            `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getTenK = async (query: string) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${apiKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};
