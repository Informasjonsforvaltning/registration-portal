import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
