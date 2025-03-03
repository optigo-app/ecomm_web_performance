import React from 'react';
import Stories from 'react-insta-stories';
import { ReactStoriesConfig } from '../../../AllTheme/HouseOfQuadri/Components/Config/ReactStoriesConfig';
import './StoryLine.scss';

const getStoryContent = (isStory, selectedProduct) => {
    if (!selectedProduct) {
        console.error("Selected product is undefined or null");
        return [];
    }

    let storyContent = [];

    const images = selectedProduct?.images || [];
    const videos = selectedProduct?.videos || [];

    switch (isStory) {
        case 1:
            storyContent = images?.length > 0 ? images?.slice(0, 1).map((url) => ({ url ,preloadResource: true})) : [];
            break;
        case 2:
            storyContent = videos?.length > 0 ? videos?.map((url) => ({ url, type: 'video', muted: true, preloadResource: true })) : [];
            break;
        case 3:
            storyContent = images?.length > 0 ? images?.map((url) => ({ url, duration: 1500 ,preloadResource: true })) : [];
            break;
        case 4:
            storyContent = [
                ...images?.map((url) => ({ url, duration: 1500 ,preloadResource: true})),
                ...videos?.map((url) => ({ url, type: 'video', duration: 5000, muted: true, preloadResource: true }))
            ];
            break;
        default:
            return [];
    }

    return storyContent;
};

const StoryLine = ({ resetKey, selectedProduct, storeInit }) => {
    const isStory = storeInit?.CartNo;
    const storyContent = selectedProduct ? getStoryContent(isStory || 1, selectedProduct) : [];
    console.log("🚀 ~ StoryLine ~ storyContent:", storyContent)
    if (!selectedProduct || storyContent.length === 0) {
        return null;
    }

    return (
        <div
            className="story-diamond"
            style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                overflow: "hidden",
                zIndex: "9999",
                height: "100%",
                width: "100%",
                backgroundColor: "red !important",
            }}
        >
            <Stories
                key={resetKey}
                {...ReactStoriesConfig}
                stories={storyContent}
                progressContainerStyles={isStory === 1 ? { display: "none" } : {}}
            />
        </div>
    );
}

export default StoryLine;
