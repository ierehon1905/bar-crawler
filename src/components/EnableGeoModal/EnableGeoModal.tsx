import React from 'react';
import { Modal } from "../Modal/Modal";

export const EnableGeoModal = () => {

    return (
        <Modal hideCloseButton title={'Warning'} bodyStyle={{padding: 20}}>
            <h1>Allow Geo!</h1>
            <p>
            <br/>
              Please allow geo to use this web app <br/><br/>
              Go to settings and allow geolocation for this web app <br/><br/>
              Then refresh the page
            </p>
        </Modal>
    )

}