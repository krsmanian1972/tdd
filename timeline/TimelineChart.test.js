import React from 'react';
import {shallow,mount,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()});

import TimelineChart from './TimelineChart';
import {select,selectAll} from 'd3-selection'

const width=600;
const height=400;

it('should create a TimeLine Chart component that mandates task and viewport boundaries', ()=>{

  const wrapper = shallow(<TimelineChart tasks={taskData} width={width} height={height}/>);

  expect(wrapper).toBeTruthy();
});


it('should build a time scale, where the earliest date of the time series to be mapped to the floor of the chart', ()=> {

  const wrapper = shallow(<TimelineChart tasks={taskData} width={width} height={height}/>);

  const xScale = wrapper.instance().xScale;

  const givenLowDate = new Date([2018,9,21]);

  expect(xScale(givenLowDate)).toEqual(0);
})

it('should build the elements that form the part of the x-axis and y-axis', () => {

  const component = mount(<TimelineChart tasks={taskData} width={width} height={height}/>);

  const chartInstance = component.instance();

  expect(chartInstance.gX.attr('class')).toBe('xAxis');
  expect(chartInstance.gY.attr('class')).toBe('yAxis');

});

it('should build the timeline elements', () => {

  const component = mount(<TimelineChart tasks={taskData} width={width} height={height}/>);

  const chartInstance = component.instance();

  const index = 2;
  const task = taskData[index];

  const graphNode = chartInstance.graphNode;
  const rects = select(graphNode).selectAll('rect');
  const resultX = getAttr(rects,index,'x');
  const resultWidth = getAttr(rects,index,'width');

  const xScale = chartInstance.xScale;
  const expectedStart = xScale(task.start);
  const expectedEnd = xScale(task.end);
  const expectedWidth = expectedEnd-expectedStart;


  expect(rects.size()).toBe(taskData.length);
  expect(resultX*1).toBe(expectedStart);
  expect(resultWidth*1).toBe(expectedWidth);
});

it('should build the text elements to appear over the timeline elements',() => {
  const component = mount(<TimelineChart tasks={taskData} width={width} height={height}/>);
  const chartInstance = component.instance();

  const index = 2;
  const task = taskData[index];

  const graphNode = chartInstance.graphNode;
  const texts = select(graphNode).selectAll('text');
  const resultX = getAttr(texts,index,'x');
  const resultText = getText(texts,index);

  const xScale = chartInstance.xScale;
  const expectedStart = xScale(task.start)+3;
  const expectedText = task.name+' ( 3 D )';

  expect(texts.size()).toBe(taskData.length);
  expect(resultX*1).toBe(expectedStart);
  expect(resultText).toBe(expectedText);

});

it('should invoke the zoom function ',()=> {

  const component = mount(<TimelineChart tasks={taskData} width={width} height={height}/>);
  const chartInstance = component.instance();

  spyOn(chartInstance,'handleZoom');

});

function getAttr(elements,index,attr) {
  return select(elements.nodes()[index]).attr(attr);
}

function getText(elements,index) {
  return select(elements.nodes()[index]).text();
}

function printRects(rects) {
  rects.each(function(d,i) {
    console.log("The x position of the rect #" + i + " is " + select(this).attr("x"));
  })
}

const taskData = [
  {
    "name":"Raja Subramanian",
    "start":new Date([2018,10,1]),
    "end":new Date([2018,10,5])
  },
  {
    "name":"Bhargav",
    "start":new Date([2018,9,21]),
    "end":new Date([2018,9,25])
  },
  {
    "name":"Surrendra",
    "start":new Date([2018,10,7]),
    "end":new Date([2018,10,10])
  },
  {
    "name":"Srikanth",
    "start":new Date([2018,10,7]),
    "end":new Date([2018,10,10])
  },
  {
    "name":"Sabapathy",
    "start":new Date([2018,10,12]),
    "end":new Date([2018,10,15])
  },
  {
    "name":"Pasupathy",
    "start":new Date([2018,10,25]),
    "end":new Date([2018,10,30])
  },
  {
    "name":"Neelagreeva",
    "start":new Date([2018,11,1]),
    "end":new Date([2018,11,15])
  }
];
