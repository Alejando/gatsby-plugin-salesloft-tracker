import React, { useState } from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';
import useClipboard from "react-use-clipboard";
const baseCode = ['<!DOCTYPE html><html><table cellpadding="0" cellspacing="0" border="0" style="background: none; border-width: 0px; border: 0px; margin: 0; padding: 0"><tbody><tr><td valign="top" style="padding-top: 0; padding-bottom: 0; padding-left: 0; padding-right: 7px; border-top: 0; border-bottom: 0; border-right: 0"><img width="160" height="160" src="https://densitylabs.io/images/email-signature/email-dl-logo@2x.png" orig_width="0" orig_height="0"><br></td><td style="padding-top: 0; padding-bottom: 0; padding-left: 12px; padding-right: 0"><table cellpadding="0" cellspacing="0" border="0" style="background: none; border-width: 0px; border: 0px; margin: 0; padding: 0"><tbody><tr><td colspan="2" style="color: rgb(237, 28, 36); font-size: 21px; font-family: Calibri, Arial, Helvetica, sans-serif"><b>',
'</b><br></td></tr><tr><td colspan="2" style="padding-bottom: 15px; color: rgb(28, 28, 27); font-size: 15px; font-family: Calibri, Arial, Helvetica, sans-serif">',
'<br></td></tr><tr><td colspan="2" style="padding-bottom: 5px; color: rgb(128, 128, 128); font-size: 13px; font-family: Courier New, Courier, monospace"><a href="mailto:',
'" style="text-decoration: none; color: rgb(128, 128, 128)">',
'</a><br></td></tr><tr><td colspan="2" style="padding-bottom: 2px; color: rgb(52, 52, 50); font-size: 15px; font-family: Calibri, Arial, Helvetica, sans-serif; width: 152px"><a href="https://densitylabs.io/" style="color: rgb(128, 128, 128); text-decoration: underline; font-weight: normal"><span class="colour" style="color:rgb(28, 28, 27)"><b>Density</b></span><span class="colour" style="color:rgb(237, 28, 36)"><b>Labs</b></span>.io</a><br></td></tr><tr><td colspan="2" style="padding-top: 10px"><a href="https://www.facebook.com/densitylabs" style="border-width: 0px; border: 0px; text-decoration: none; padding-right: 5px"><img width="24" height="26" style="border: none; width: 24px; max-width: 24px !important; height: 26px; max-height: 26px !important" src="https://densitylabs.io/images/email-signature/email-fb@2x.png"></a>&nbsp;&nbsp;<a href="https://twitter.com/densitylabs" style="border-width: 0px; border: 0px; text-decoration: none; padding-right: 5px"><img width="24" height="26" style="border: none; width: 24px; max-width: 24px !important; height: 26px; max-height: 26px !important" src="https://densitylabs.io/images/email-signature/email-tw@2x.png"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/densitylabs" style="border-width: 0px; border: 0px; text-decoration: none; padding-right: 5px"><img width="24" height="26" style="border: none; width: 24px; max-width: 24px !important; height: 26px; max-height: 26px !important" src="https://densitylabs.io/images/email-signature/email-ig@2x.png"></a>&nbsp;&nbsp;<a href="https://www.linkedin.com/company/10520327/" style="border-width: 0px; border: 0px; text-decoration: none; padding-right: 5px"><img width="24" height="26" style="border: none; width: 24px; max-width: 24px !important; height: 26px; max-height: 26px !important" src="https://densitylabs.io/images/email-signature/email-li@2x.png"></a>&nbsp;&nbsp;<a href="https://www.youtube.com/channel/UCk5QUrs2j63QpC8JjQ8yr-A" style="border-width: 0px; border: 0px; text-decoration: none"><img width="26" height="26" style="border: none; width: 26px; max-width: 26px !important; height: 26px; max-height: 26px !important" src="https://densitylabs.io/images/email-signature/email-yt@2x.png"></a><br></td></tr></tbody></table></td></tr></tbody></table></html>'
];
const EmailSignature = () => {
  const [name, setName] = useState('NAME LASTNAME');
  const [position, setPosition] = useState('POSITION');
  const [email, setEmail] = useState('MY_EMAIL@densitylabs.io');
  const [copiedComponent, setCopiedComponent] = useState(false);
  const signatureCode = () => {
    return baseCode[0] + name + baseCode[1] + position + baseCode[2] + email + baseCode[3] + email + baseCode[4]
  };
  const [isCopied, setCopied] = useClipboard(signatureCode(), {
    successDuration: 2000
  });
  const CopyToClipboard = (element) => {

		var doc = document
		, text = doc.getElementById(element)
		, range, selection;
    
	if (doc.body.createTextRange)
    {
		range = doc.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} 
    
    else if (window.getSelection)
    {
		selection = window.getSelection();        
		range = doc.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
 	}
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
  setCopiedComponent(true);
  setTimeout(function(){  setCopiedComponent(false); }, 2000);
}
  return (
    <SimpleLayout>
     <Container className="py-5">
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label for="name" className="font-weight-bold">Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-required
              />
            </FormGroup>
            <FormGroup>
              <Label for="position" className="font-weight-bold">Position:</Label>
              <Input
                type="text"
                name="position"
                id="position"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                aria-required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className="font-weight-bold">Email:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-required
              />
            </FormGroup>
          </Col>
          <Col md={7}>
            <div className="shadow" id="email-signature-preview" dangerouslySetInnerHTML={{ __html: signatureCode() }}/>
            <div className='d-flex justify-content-center mt-5' >
              <Button onClick={setCopied} color={isCopied ? 'success' : 'primary'} className="mr-2">
                {isCopied ? 'Copied ✔️ ' : 'Copy HTML'}
              </Button>
              <Button onClick={() => CopyToClipboard('email-signature-preview')} color={copiedComponent ? 'success' : 'primary'}>
              {copiedComponent ? 'Copied ✔️ ' : 'Copy Signature'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </SimpleLayout>
  );
}

export default EmailSignature