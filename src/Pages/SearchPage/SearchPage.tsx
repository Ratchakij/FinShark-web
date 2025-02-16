import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props { }

function SearchPage({ }: Props) {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setserverError] = useState<string | null>(null);

    const getPortfolio = () => {
        portfolioGetAPI()
            .then((res) => {
                if (res?.data) {
                    setPortfolioValues(res?.data);
                }
            })
            .catch((e) => {
                setPortfolioValues(null);
            });
    };

    useEffect(() => {
        getPortfolio();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        portfolioAddAPI(e.target[0].value)
            .then((res) => {
                // console.log("res: ", res);
                if (res?.status === 201) {
                    toast.success("Stock added to portfolio!");
                    getPortfolio();
                }
            })
            .catch((e) => {
                toast.warning("Could not add stock to portfolio!");
            });
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteAPI(e.target[0].value).then((res) => {
            // console.log("res: ", res);
            if (res?.status == 200) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio();
            }
        });
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        //setServerError(result.data);
        if (typeof result === "string") {
            setserverError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };

    return (
        <>
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <ListPortfolio
                portfolioValues={portfolioValues!}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList
                searchResult={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />
            {serverError && <h1>Unable to connect to API</h1>}
        </>
    );
}

export default SearchPage;
