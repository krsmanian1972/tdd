import React from 'react';
import PropTypes from 'prop-types';

import { max,min } from 'd3-array';
import { scaleLinear,scaleTime } from 'd3-scale';
import { axisLeft,axisBottom } from 'd3-axis';
import { select,event } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import { timeDay } from 'd3-time';
import { zoom, zoomIdentity } from 'd3-zoom';

import './TimelineChart.css';

const bar_height=15;

class TimelineChart extends React.Component {

  constructor(props) {
    super(props);

    this.width = props.width;
    this.height = props.height;

  }

  componentDidMount() {
    this.buildChartScales();
    this.buildAxisElements();
    this.buildChartElements();
    this.addZoomListener();
  }


  buildChartScales() {

    const tasks = this.props.tasks;

    const dateElements = this.getDateElements(tasks);
    const maxDate = max(dateElements);
    const minDate = min(dateElements);

    this.xScale = scaleTime().domain([minDate,maxDate]).range([0,this.width]);
    this.yScale = scaleLinear().domain([0,tasks.length]).range([0,this.height]);
  }


  buildAxisElements() {

    this.xAxis = axisBottom().scale(this.xScale).tickFormat(timeFormat('%d-%m')).ticks(timeDay.every(1));
    this.yAxis = axisLeft().scale(this.yScale);

    this.gX = select(this.axisNode)
      .append('g')
      .attr('class','xAxis')
      .call(this.xAxis);

    this.gY = select(this.axisNode)
        .append('g')
        .attr('class','yAxis')
        .call(this.yAxis);
  }

  buildChartElements() {

    const tasks = this.props.tasks;

    const svgElement = select(this.graphNode)
      .selectAll('g')
      .data(tasks)
      .enter()
      .append('g')
      .attr('class','svg_container');

    svgElement.append('rect');
    svgElement.append('text');

    select(this.graphNode)
      .selectAll('rect')
      .data(tasks)
      .attr('x',d=> this.xScale(d.start))
      .attr('y',(d,i)=> this.yScale(i))
      .attr('rx',3)
      .attr('ry',3)
      .attr('width',d=>(this.xScale(d.end)-this.xScale(d.start)))
      .attr('height',bar_height)
      .attr('fill','green')
      .attr('class',"rectangle_segment")

    select(this.graphNode)
      .selectAll('text')
      .data(tasks)
      .attr('x',d=> this.xScale(d.start)+3)
      .attr('y',(d,i)=>( (this.yScale(i)+bar_height/2) ) )
      .attr('fill','white')
      .attr("font-size",8)
      .text(d=>this.getText(d));
  }

  addZoomListener() {
    const zoomer = zoom().scaleExtent([1,5]).on('zoom',this.handleZoom.bind(this));

    const zoomable = select(this.graphNode).call(zoomer);

    try
    {
      const initialTransformation = zoomIdentity.translate(bar_height, bar_height).scale(2);
      zoomable.call(zoomer.transform, initialTransformation);
    }
    catch (e)
    {
      console.log("JSDOM Error Boundary");
    }

  }

  handleZoom() {

    const zoomTransform = event.transform;

    select(this.graphNode)
      .selectAll(".svg_container")
      .attr("transform", zoomTransform);

    this.gX.call(this.xAxis.scale(zoomTransform.rescaleX(this.xScale)));
    this.gY.call(this.yAxis.scale(zoomTransform.rescaleY(this.yScale)));

  }

  getText(d) {
    return d.name+" ( "+ (timeDay.count(d.start,d.end))+" D )";
  }


  getDateElements(tasks) {
      const dateElements = tasks.reduce((whole,el) => {
        whole.push(el.start);
        whole.push(el.end);
        return whole;
      },[]);

      return dateElements;
  }

  render() {
    return (
      <div className="timeline_container" style={{height: this.height, width:this.width}}>
        <svg ref={node => this.axisNode = node} width={this.width} height={bar_height*1.5} />
        <svg ref={node => this.graphNode = node} width={this.width} height={this.height-(bar_height*3)} />
      </div>
    );
  }
}

TimelineChart.propTypes = {
  tasks: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};


export default TimelineChart
