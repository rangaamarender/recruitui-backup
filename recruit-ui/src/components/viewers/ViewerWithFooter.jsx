import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import './viewer.css';

const ViewerWithFooter = ({ visible, onHide, header, contentComponent }) => {
    const showCloseIcon = false;
    const blockScroll = true;
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };
    console.log(scrollPosition); 
    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            position="right"
            showCloseIcon={showCloseIcon}
            blockScroll={blockScroll}
            className="w-75"
        >
            <div className="fixed  viewer-without-tabs-header w-75 ">{header}</div>
            <div className="sidebar-content fixed right-0 w-75 overflow-y-auto"  onScroll={handleScroll}>
                {contentComponent}
            </div>
        </Sidebar>
    );
};

export default ViewerWithFooter;
