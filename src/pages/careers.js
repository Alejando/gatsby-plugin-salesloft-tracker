import React, { Component } from 'react'
import {
  Container,
  Button,
} from 'reactstrap';
import Layout from '../components/layout'
import { withPrefix } from 'gatsby'
import Banner from '../components/banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import hotFlame from '../images/hot-flame.png'
import CareerOpportunity from '../services/career-opportunity'
import { css } from 'emotion'
import ApplyToCareer from '../components/careers/apply'
import Spinner from '../components/spinner';
import bannerImage from '../images/work_densitylabs.png'

const siteMeta = {
  subtitle: 'Careers',
  path: '/careers',
  openGraphTitle: 'Join Our Team',
  keywords: 'densitylabs, densitylabs we are hiring, work with us, work with us from home, jobs available, careers, join our team, we are looking for talent people, job opportunities, density labs Join us',
  description: 'We are looking for talent people like you.',
  image: withPrefix('/images/Software_engineer.png'),
  type: 'website'
}

class Careers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      careers: [],
      careerSlug: null,
      showApplyModal: false,
      loading: true
    }

  }

  componentWillMount() {
    CareerOpportunity.getCareers().then((result) => {
      this.setState({ 
        careers: result.data,
        loading: false
      });
    });
  }

  handleApplyNow(careerSlug) {
    this.setState({
      showApplyModal: true,
      careerSlug: careerSlug
    })
  }

  render(){
    return(
      <Layout siteMeta={siteMeta}>
        <ApplyToCareer 
          show={this.state.showApplyModal}
          toggle={ (value) => this.setState({showApplyModal: !value}) }
          careerSlug={this.state.careerSlug}
        />
        <Banner
          image={bannerImage}
          title='Join Our Team'
          content='Density Labs has a workplace where you can grow, learn and get professional development opportunities. We have a highly collaborative environment and we are focused on delivering the best products possible for our clients. We like to keep our people happy and to maintain a relaxed work environment. We are in constant growth, always in search of more collaborators.<br/><br/>Be part of our team!'
          textAlign= 'left'
        >
          <Link to="/benefits">
            <span className="ml-2" css={ css`
              font-size: 1.1rem; 
              color: #fff;
              font-weight: bold;
              text-decoration: underline;
            `}>
              See the benefits we offer.
            </span>
          </Link>
        </Banner>
        <Container className="py-5">
          <h1
            className="border-bottom pb-5 text-uppercase m-0 text-center"
          >
            Career opportunities
          </h1>
          {
            this.state.loading ? 
            (
              <div
                css={ css`
                  width: 100%;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  margin-top: 40px;
                `}
              >
                <Spinner
                  color="#929497"
                  size='30px'
                />
              </div>
            ) 
            : 
            (
              this.state.careers.map((career, i) => (
              <div key={i} className="border-bottom pb-4 pt-3">
                <div className="d-inline-flex border-bottom align-items-center w-100 pb-3 mb-3">
                  { 
                    career.is_high_priority &&
                    <img src={hotFlame} width={40} alt="hot flame" className="mr-4"/>
                  }
                  <h3 className="text-uppercase m-0 p-0">{ career.name }</h3>
                </div>
                <div dangerouslySetInnerHTML={{ __html: career.description }} />
                <br/>
                <h3>
                  <FontAwesomeIcon icon={["fas", "check-circle"]} /> &nbsp;
                  Must-have
                </h3>
                <ul>
                  { career.must_have.map((requirement, i) => (<li key={i}>{requirement}</li>))}
                </ul>
                { career.nice_to_have.length > 0 &&
                  <h3>
                    <FontAwesomeIcon icon={["fas", "thumbs-up"]} /> &nbsp;
                    Nice to have
                  </h3>
                }
                <ul>
                  {  career.nice_to_have.map((requirement, i) => (<li key={i}>{requirement}</li>))
                  }
                </ul>
                <Button  color="danger" onClick={() => this.handleApplyNow(career.slug)}>
                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                  <span className="ml-2">Apply Now</span>
                </Button>
                <span className="m-3">or</span>
                <Link to="/seeking-developers-who-love-to-code">
                  <Button color="danger" >
                    <FontAwesomeIcon icon={["fas", "user-circle"]} />
                    <span className="ml-2">Refer a friend</span>
                  </Button>
                </Link>
                {
                  career.referral_bonus > 0 &&
                  <p className="mt-3">REFER A FRIEND AND RECEIVE ${career.referral_bonus} DOLLARS!!</p>
                }
              </div>
             ))
            )
        }
        </Container>
      </Layout>
    )
  }
}

export default Careers
