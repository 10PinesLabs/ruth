import React  from 'react';
import { connect } from 'react-redux';
import Loading from './common-pages/Loading';

const LoadingSwitcher = ({appIsLoading, children}) => {

  if(appIsLoading){
   return (<Loading/>)
  }

  return(
    children
  )


}

const mapStateToProps = (state) => ({
  appIsLoading: state.appIsLoading,

});
export default connect(mapStateToProps)(LoadingSwitcher);
