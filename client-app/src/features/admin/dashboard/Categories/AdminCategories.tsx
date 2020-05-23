import React, { Fragment } from 'react'
import CategoriesList from './CategoriesList'
import CategoryForm from './CategoryForm'

const AdminCategories = () => {
    return (
        <Fragment>
            <CategoriesList />
            <CategoryForm />
        </Fragment>
    )
}

export default AdminCategories
