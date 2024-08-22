import React, { Component } from 'react';
import { connect } from 'react-redux';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router";

class OutStandingDoctor extends Component {
constructor(props) {
    super(props);
    this.state = {
        arrDoctors:[]
    }
}
    componentDidUpdate(prevProps, prevState,snapshot) {
if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
    this.setState({
        arrDoctors: this.props.topDoctorsRedux
    })
}
    }
componentDidMount() {
this.props.loadTopDoctor();
}
    handleViewDetailDoctor = (doctor) =>{
this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        let {language} = this.props;
        return (
            <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
            <div className='section-header'>
            <span className='title-section'> <FormattedMessage id="homepage.out-standing-doctor"/> </span>
            <button className='btn-section'>Xem thêm</button>
            </div>
            <div className='section-body'>
             <Slider {...this.props.settings}>

                 {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item,index) =>{
                    let imageBase64 = '';
                     if (item.image){
                      imageBase64 = new Buffer(item.image,'base64').toString('binary')
                     }
                     let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName} `
                     let nameEn = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`
                     return (
                         <div className='section-customize' key={index}
                              onClick={() => {
                             this.handleViewDetailDoctor(item)
                         }}>
                             <div className='customize-border'>
                                 <div className='outer-bg'>
                                     <div className='bg-image section-outstanding-doctor'
                                     style={{backgroundImage: `url(${imageBase64})`}}
                                     />
                                 </div>
                                 <div className='position text-center'>
                                     <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>

                                 </div>
                             </div>

                         </div>
                     )
                 })}
             </Slider>

            </div>


            </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));