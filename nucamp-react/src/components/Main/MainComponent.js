import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Directory from '../Directory/DirectoryComponent';
import Header from '../Header/HeaderComponent';
import Footer from '../Footer/FooterComponent';
import Home from '../Home/HomeComponent';
import About from '../About/AboutComponent';
import ContactUs from '../ContactUs/ContactComponent';
import CampsiteInfo from '../Campsite/CampsiteInfoComponent';
import { CAMPSITES } from '../../shared/campsites';
import { COMMENTS } from '../../shared/comments';
import { PARTNERS } from '../../shared/partners';
import { PROMOTIONS } from '../../shared/promotions';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};



class Main extends Component {

    // constructor(props){
    //     super(props);
    //     this.state ={
    //         campsites: CAMPSITES,
    //         comments: COMMENTS,
    //         partners: PARTNERS,
    //         promotions: PROMOTIONS
    //     }
    // }
  

    render() {
        const HomePage = ()=> {

            return(
                <Home campsite={this.props.campsites.filter(campsite => campsite.featured)[0]} 
                      promotion={this.props.promotions.filter(promotion => promotion.featured)[0]} 
                      partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                  comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} />
            );
        };

        const Contact = () => {
           return(
                <ContactUs />
           );
        }

        
        return (
            <div>
                <Header />
                <Switch>
                    {/* <Route path='/home' component={HomePage} /> */}
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} /> } />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/about' render={() => <About partners={this.props.partners} />} />
                    <Route exact path='/contactus' component={Contact} />
                    {/* <Redirect to='/home' /> */}
                </Switch>
                
                <Footer />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps)(Main));

// export default Main;