import React from 'react';
import { SalatConsumer } from '../salatServiceContext';


const withSalatService = () => (Wrapped) => {
    return (props) => {
        return (
            <SalatConsumer>
                {
                    (SalatService) => {
                        return (
                            <Wrapped {...props}
                                SalatService={SalatService} />
                        );
                    }
                }
            </SalatConsumer>
        );
    }
};

export default withSalatService;