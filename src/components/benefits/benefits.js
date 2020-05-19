import React from 'react';
import { css } from 'emotion';
import {
  Container,
  Row
} from 'reactstrap';
import Benefit from '../benefit/benefit';
import BenefitsData from '../../../data/benefits.json';

class Benefits extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      benefits: BenefitsData
    }
  }

  render() {
    return (
      <Container className="pt-5 pb-3">
        <h1
          className="pb-0 text-uppercase m-0 text-center mb-0"
        >
          Company Benefits
        </h1>
        <div>
          <div className="mt-3 pt-3 text-center mb-5" id="benefits">
            <h4 className="border-top d-block pt-3" css={css`font-weight: 300;`}>
              See the great benefits that come with being a part of the team at Density Labs.
            </h4>
          </div>
        </div>
        <div>
          <Container className="shadow" css={css`
            background-color: white;
            padding: 30px;
            padding-bottom: 15px;
          `}>
            <Row>
              {this.state.benefits.map(({text, icon}) =>{
                return (
                  <Benefit
                    text={text}
                    icon={icon}
                    key={icon}
                  />
                )
              })}
          </Row>
          </Container>
        </div>
      </Container>
    )
  }
}

export default Benefits;
