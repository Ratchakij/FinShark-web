import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company';
import { getTenK } from '../../api';
import Spinner from '../Spinner/Spinner';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';

type Props = {
    ticker: string;
}

const TenKFinder = ({ ticker }: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>();

    useEffect(() => {
        const getTenKData = async () => {
            const res = await getTenK(ticker);
            setCompanyData(res?.data);
        }
        getTenKData();
    }, [ticker])


    return (
        <div className='inline-flex rounded-md shadow-sm m-4'>
            {companyData ? (
                companyData?.slice(0, 5).map((tenK, index) => {
                    return <TenKFinderItem key={index} tenK={tenK} />
                })
            ) : (
                <Spinner />
            )}
        </div>
    )
}

export default TenKFinder