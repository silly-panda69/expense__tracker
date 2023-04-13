import React, { useContext } from 'react';
import { ExpenseTotalContext } from '../contexts/ExpenseTotalContext';
import { ExpenseContext } from '../contexts/ExpenseContext';
import Rupee from './Rupee';

const ListView = () => {
    const hw=25;
    const{total,balance}=useContext(ExpenseTotalContext);
    const Millify=(value)=>{
        var newValue = value;
        if(value<0){
            value*=-1;
            newValue*=-1;
        }
        if (value >= 1000) {
            var suffixes = ["", "k", "m", "b","t"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
        }
        return newValue;
    }
    return (
        <div className='d-sm-flex justify-content-between font-monospace' >
            <div className="card shadow-sm flex-grow-1 mx-3 mt-3 ">
                <div className="card-body d-flex justify-content-between align-items-stretch">
                    <div>
                        {(balance-total)<0 && <h1 className='text-danger d-flex align-items-center' >-<Rupee hw={hw}></Rupee>{Millify(balance-total)}</h1>}
                        {(balance-total)>=0 && <h1 className='text-primary d-flex align-items-center' ><Rupee hw={hw}></Rupee>{Millify(balance-total)}</h1>}
                        <p className='text-secondary'>Balance</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="grey" class="bi bi-wallet2" viewBox="0 0 16 16">
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                    </svg>
                </div>
            </div>
            <div className="card shadow-sm flex-grow-1 mx-3 mt-3 ">
                <div className="card-body d-flex justify-content-between align-items-stretch">
                    <div>
                        <h1 className='text-primary text-truncate d-flex align-items-center' ><Rupee hw={hw}></Rupee>{Millify(total)}</h1>
                        <p className='text-secondary'>Transactions</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="grey" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
</svg>
                </div>
            </div>
            <div className="card shadow-sm flex-grow-1 mx-3 mt-3 ">
                <div className="card-body d-flex justify-content-between align-items-stretch">
                    <div>
                        <h1 className='text-primary d-flex align-items-center' ><Rupee hw={hw}></Rupee>{Millify(balance)}</h1>
                        <p className='text-secondary'>Earnings</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="grey" class="bi bi-cash-stack" viewBox="0 0 16 16">
  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z"/>
</svg>
                </div>
            </div>
            {/* <div className="card shadow-sm flex-grow-1 mx-3 mt-3 ">
                <div className="card-body">
                    <h1 className='text-primary' ></h1>
                    <p className='text-secondary'>Count</p>
                </div>
            </div> */}
        </div>
    );
}
 
export default ListView;
