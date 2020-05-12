import React from 'react'
import { IPost } from '../../../app/models/post'
import { observer } from 'mobx-react-lite'

interface IProps {
    post: IPost
}

const PostDetailedHeader: React.FC<IProps> = ({post}) => {
    return (
        <div>
            
        </div>
    )
}

export default observer(PostDetailedHeader);
