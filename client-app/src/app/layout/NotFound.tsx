import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon style={{marginBottom: 50}}>
                <Icon name='search' />
                Oops - Couldn't find what you were looking for.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/' primary>
                    Return to the homepage
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;