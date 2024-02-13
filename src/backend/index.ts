import { Canister, query,bool ,int32 , text, update, Void } from 'azle';

type policy = {
    startDate: Date;
    endDate: Date;
    coverageAmount: number;
}

let storageInsurances: Record<string, policy> = {};

export default Canister({
    getAllInsurances: query([], text, () => {
        let result = "";
        for (const [holder,val] of Object.entries(storageInsurances)) {
            result += `${holder}: ${val.startDate.toDateString()} to ${val.endDate.toDateString()}, Coverage Amount: $${val.coverageAmount}\n`;
        }
        return result;
    }),

    isPolicyactive: query([text], bool, (p_holder) => {
        for (const [holder,val] of Object.entries(storageInsurances)) {
            if (p_holder === holder) {
                if (new Date() < val.endDate) {
                    return true;
                }
            }
        }
        return false;
    }),

    checkPolicybalance: query([text], int32, (p_holder) => {
        for (const [holder,val] of Object.entries(storageInsurances)) {
            if (p_holder === holder) {
                return val.coverageAmount;
            }
        }
        return 0;
    }),

    useInsurance: update([text,int32], bool, (p_holder,p_Amount) => {
        for (const [holder,val] of Object.entries(storageInsurances)) {
            if (p_holder === holder) {
                if (val.coverageAmount > p_Amount) {
                    val.coverageAmount -= p_Amount;
                    return true;
                }
            }
        }
        return false;
    }), 

    addInsurance: update([text,int32], Void, (p_holder,p_coverageAmount) => {
        const p_enddate: Date = new Date();
        p_enddate.setMonth(p_enddate.getMonth() + 5);
        let newPolicy : policy = {
            startDate: new Date(),
            endDate: p_enddate,
            coverageAmount: p_coverageAmount,
        };
        storageInsurances[p_holder] = newPolicy;
    })
});