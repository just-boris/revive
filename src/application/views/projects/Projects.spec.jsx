/*eslint-env jasmine*/
import {Projects} from './Projects.jsx';
import Project from '../../components/project/Project.jsx';
import {shallow} from 'reagent';

describe('<Projects />', function() {
    it('should render view', function() {
        const projects = shallow(<Projects />);
        expect(projects.find(Project)).toBe([]);
    });
});
