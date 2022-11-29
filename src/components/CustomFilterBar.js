import { BusyIndicator,Select,Switch,MultiInput,MultiComboBoxItem,ComboBoxItem,DateRangePicker,Token,MultiComboBox,Option,DynamicPage, DynamicPageHeader, DynamicPageTitle, FilterBar, Page,Input,ComboBox,VariantManagement,VariantItem, Title,FlexBox,Button,Label,Breadcrumbs,BreadcrumbsItem,ObjectStatus,Badge,FilterGroupItem,StepInput } from '@ui5/webcomponents-react';
import React from 'react'

function CustomFilterBar() {
  return (
    <FilterBar header={<Title>Test</Title>} hideToolbar>
      <FilterGroupItem label="Shipment No." style={{maxWidth: '15rem'}} required>
        <Input placeholder='Shipment / Freight Order Number' required/>
      </FilterGroupItem>
    </FilterBar>
  )
}

export default CustomFilterBar