import React, { Fragment } from 'react'
import PostDetailedComments from './PostDetailedComments'
import PostDetailedRecommendations from './PostDetailedRecommendations'

const PostDetailedFooter = () => {
    return (
        <Fragment> 
            <PostDetailedRecommendations />
            <PostDetailedComments />
        </Fragment>
    )
}

export default PostDetailedFooter
