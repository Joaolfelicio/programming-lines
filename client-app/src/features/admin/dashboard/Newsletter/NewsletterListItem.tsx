import React from 'react'
import { observer } from 'mobx-react-lite'
import { INewsletter } from '../../../../app/models/newsletter';

interface IProps {
    newsletter: INewsletter;
}

const NewsletterListItem: React.FC<IProps> = ({newsletter}) => {
    return (
        <div>
            {newsletter.email}
        </div>
    )
}

export default observer(NewsletterListItem);
