import { useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getCompData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';
import Spinner from '../Spinner/Spinner';

type Props = {
    ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
    const [companyData, setCompanyData] = useState<CompanyCompData>();

    useEffect(() => {
        const getComps = async () => {
            try {
                const res = await getCompData(ticker);

                if (!res) {
                    const defaultData = [
                        {
                            symbol: "TEST",
                            peersList: [
                                "TEST", "SNEJF", "PCRFY", "SONO", "VZIO", "MICS",
                                "WLDSW", "KOSS", "GPRO", "SONY", "UEIC", "HEAR",
                            ]
                        }
                    ];
                    setCompanyData(defaultData[0]);
                    return;
                }

                setCompanyData(res.data[0]);
            } catch (error) {
                console.error("Error fetching company data: ", error);
            }
        };

        getComps();
    }, [ticker])

    return (
        <div className="inline-flex rounded-md shadow-sm m-4" role="group">
            {companyData ? (
                companyData?.peersList.map((ticker, index) => {
                    return <CompFinderItem key={index} ticker={ticker} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default CompFinder