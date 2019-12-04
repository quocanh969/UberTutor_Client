import {connect} from 'react-redux'
import RegisterTutor from './RegisterTutor'

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const RegisterTutorContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterTutor);

export default RegisterTutorContainer;