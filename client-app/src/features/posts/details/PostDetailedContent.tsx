import React from 'react'
import { IPost } from '../../../app/models/post'
import { observer } from 'mobx-react-lite'

interface IProps {
    post: IPost;
}

const PostDetailedContent: React.FC<IProps> = ({post}) => {
    return (
        <div>
            {post.title}
            {post.content}
        </div>
    )
}

export default observer(PostDetailedContent);
