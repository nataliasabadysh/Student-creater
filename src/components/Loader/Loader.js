import React from 'react';
import styles from './Loader.module.css';

const Spiner = () => (
    <div className = { styles.wrap }>
        <div className = { styles.ldsDualRing } />
    </div>
);

export default Spiner;
