import React from "react";
import { utils, actions } from "../../../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Animation, SectionTitle } from "../../../components";
import RequestWithdrawal from "../RequestWithdrawal";
import FundWallet from "../FundWallet";
const {
  formatting: { formatCurrency },
} = utils;
const {
  walletActions: { requestWithdrawalRequest },
} = actions;
const { FadeInLeft, FadeInRight } = Animation;
const WalletStatus = ({ wallet_balance, amount_withdrawn }) => {
  return (
    <section className="overflow-h slim-border-2 padding-horizontal-md margin-bottom-md bg-white summary overflow-h">
      <SectionTitle title="Account Summary" />
      <div className="d-flex align-items-stretch padding-vertical-md ">
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <FadeInLeft duration={0.2}>
            <p className="font-lg font-weight-500 uppercase text-center color1">
              {formatCurrency(wallet_balance)}
            </p>
            <span className="uppercase font-sm font-weight-300 text-center">
              Wallet Balance
            </span>
          </FadeInLeft>
        </div>
        <div className="d-flex column flex-center padding-horizontal-md padding-vertical-xsm margin-bottom-sm slim-border-right slim-border-bottom statement">
          <FadeInRight duration={0.2}>
            <p className="font-lg font-weight-500 uppercase text-center danger-text">
              {formatCurrency(amount_withdrawn)}
            </p>
            <span className="uppercase font-sm font-weight-300 text-center">
              withdrawn
            </span>
          </FadeInRight>
        </div>
      </div>
      <div className="d-flex">
        <RequestWithdrawal />
        <div className="margin-left-md"><FundWallet /></div>
      </div>
    </section>
  );
};

const mapWalletToProps = (state) => {
  const {
    wallet: { wallet_balance, amount_withdrawn },
  } = state.walletReducer;
  return { wallet_balance, amount_withdrawn };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestWithdrawal: requestWithdrawalRequest }, dispatch);
export default connect(mapWalletToProps, mapDispatchToProps)(WalletStatus);
