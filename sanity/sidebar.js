import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { RiHome2Line as icon } from 'react-icons/ri';

// building custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(icon)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
