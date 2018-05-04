import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';

export default SortableElement(task => <li>{task.value}</li>);

