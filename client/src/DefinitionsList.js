
import styled from "styled-components";


export default function DefinitionsList({definitions}){

    const DefinitionsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

    const Definition = styled.div`
    margin-top: 1rem;
        background-color: ${props => props.theme.lightPrimary};
        padding: 0.5rem;
        height: 8rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    `;

    const DefinitionTitle = styled.div`
        display: flex;
        justify-content: space-between;
    `;

    const DefinitionBody = styled.div`
        display: flex;
        flex-direction: column;
    `;


    return (

        <DefinitionsList>
            {definitions && definitions.map((definition, index) => {
                return (
                    <Definition key={`definition${index}`}>
                        <DefinitionTitle>
                        {definition.translations && <div><strong>{definition.translations.map(string => (string.charAt(0).toUpperCase() +string.substr(1))).join(" | ")}</strong></div>}
                        {definition.domain &&<div>  Domain: {definition.domain}</div>}
                            {definition.usage &&<div> Usage: {definition.usage}</div>}
                        </DefinitionTitle>
                        <DefinitionBody>
                            {definition.spanishDef && <div>Spanish Definition: {definition.spanishDef}</div>}
                            {definition.exampleSpan &&<div> Example: {definition.exampleSpan}</div>}
                            {definition.exampleTrans && <div>Example: {definition.exampleTrans}</div>}
                        </DefinitionBody>
                    </Definition>
                )
            })}
        </DefinitionsList>
    )
}