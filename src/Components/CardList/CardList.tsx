import { SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";

interface Props {
    searchResult: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({ searchResult, onPortfolioCreate }: Props): JSX.Element => {
    return (
        <>
            {searchResult.length > 0 ? (
                searchResult.map((result) => {
                    return (
                        <Card
                            key={uuidv4()}
                            id={result.symbol}
                            searchResult={result}
                            onPortfolioCreate={onPortfolioCreate}
                        />
                    );
                })
            ) : (
                <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                    No results!
                </p>
            )}
        </>
    );
};

export default CardList;

// <Card companyName="Apple" ticker="AAPL" price={100} />
// <Card companyName="Microsoft" ticker="MSFT" price={200} />
// <Card companyName="Tesla" ticker="TSLA" price={300} />
