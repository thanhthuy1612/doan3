import { getIPFS } from '~/utils/api';
import { baseURLTransfer } from './url';
import { addressContract } from '~/redux/reducer/Account/addressContract';

export const getTransfer = async (address, page, offset) => {
    try {
        const res = await getIPFS(
            baseURLTransfer +
                '?module=account&action=txlist&contractaddress=' +
                addressContract +
                '&address=' +
                address +
                '&startblock=0&endblock=99999999' +
                '&method=Create Token' +
                '&sort=asc&apikey=W5Y5FG3JIP82AHBFTK9NDINFVEBKE77BWK',
            { params: {} },
        );
        return res.result;
    } catch (err) {
        console.log(err);
    }
};
