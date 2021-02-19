// import { EventRegister } from 'react-native-event-listeners';
import * as Common from '../components/utils/common';
import * as Constants from '../components/utils/constants';

// import { EventRegister } from 'react-native-event-listeners'

const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Version-Code':"1",
        // 'Device-Type':Constants.Device_Type
       
    };
    // console.log("SharedManager.getInstance().getAuthToken() =>", SharedManager.getInstance().getAuthToken())
    // if (SharedManager.getInstance().getAuthToken() !== '' && SharedManager.getInstance().getAuthToken() !== null && SharedManager.getInstance().getAuthToken() !== undefined){
    //    // debugger
    //     headers.Authorization = "Bearer " + SharedManager.getInstance().getAuthToken()
    // }
    return headers;
};


const getImageHeader = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Version-Code':"1",
        // 'Device-Type':Constant.Device_Type,
        // 'Authorization': "Bearer " + SharedManager.getInstance().getAuthToken()
    };
    return headers;
};


export const postData = (methodName:String, postValue:Object) => {
    console.log(`${Constants.BASE_URL}${methodName}`);
    console.log(JSON.stringify(postValue));
    console.log(JSON.stringify(getHeaders()));
    return fetch(`${Constants.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postValue)
    }).then(response => { 
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        console.log("Server Response =>", responseJson);
        if (responseJson !== undefined && responseJson.code === 401) {
          //  logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);

        });
    // return getHeaders().then(args => {
    //     

    // });
};
export const getData = (methodName:String) => {
    console.log(`${Constants.BASE_URL}${methodName}`);
    console.log(JSON.stringify(getHeaders()));
    return fetch(`${Constants.BASE_URL}${methodName}`, {
        method: 'GET',
        headers: getHeaders(),
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        if (responseJson !== undefined && responseJson.code === 401) {
           // logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
        });
   
};


export const postDataWithImage = ( methodName: string, postValue:Object) => {
    console.log(`${Constants.BASE_URL}${methodName}`);
    console.log(getImageHeader());
    console.log(postValue);
    return fetch(`${Constants.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getImageHeader(),
        body: postValue
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
         console.log(JSON.stringify(responseJson));
        if (responseJson !== undefined && responseJson.code === 401) {
           //  logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            console.error(error);
            return error;

        });
};

// const logoutDeleteCase = (msg) => {
//     const actions = [
//         {
//             text: 'Ok',
//             onPress: () => {
//                 EventRegister.emit('refreshRootRounter', 'logout add');
//             }
//         }
//     ];
//     Common.showAlertwithAction(Constants.PROJECTNAME, msg, actions);
// };
