import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from '../../utils';
import _ from "lodash";

class Header extends Component {
constructor(props) {
    super(props);
    this.state = {
        menuApp: []
    }
}
    handleChangeLanguage = (language) =>{
        this.props.changeLanguageApp(language)
    }
    componentDidMount() {
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo)){
            let role = userInfo.roleId;
            if(role === USER_ROLE.ADMIN){
               menu =  adminMenu;
            }
            if(role === USER_ROLE.DOCTOR){
                menu =  doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })

    }

    render() {
    const { processLogout,language, userInfo} = this.props;
console.log('check user info', userInfo)
    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={this.state.menuApp} />
            </div>
            <div className='languages'>
                <span className='welcome'>
                    <FormattedMessage id="homeheader.welcome"/>{' '} 
                    {userInfo && userInfo.firstname ? userInfo.firstname : ' '} !
                </span>
                <span className={language === LANGUAGES.VI ? 'languages-vi active' : 'language-vi'} 
                onClick={()=> this.handleChangeLanguage(LANGUAGES.VI)}>
                    VN
                    </span>
                <span className={language === LANGUAGES.EN ? 'languages-en active' : 'language-en'} 
                onClick={()=> this.handleChangeLanguage(LANGUAGES.EN)}>
                    EN
                    </span>


                <div className="btn btn-logout" onClick={processLogout}>
                <i className="fas fa-sign-out-alt"></i>
            </div>
            </div>

            {/* nút logout */}
            
        </div>
    );
}
}
const mapStateToProps = state => {
    return {
                            isLoggedIn: state.user.isLoggedIn,
                            language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
                            processLogout: () => dispatch(actions.processLogout()),
                            changeLanguageApp:(language) => dispatch(actions.changeLanguageApp(language))

                        };
};

                        export default connect(mapStateToProps, mapDispatchToProps)(Header);