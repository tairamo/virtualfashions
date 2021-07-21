import fs from 'fs'
import path from 'path'
import showdown from 'showdown'

import Layout from '../../components/layout'


function From2275({html}) {

    return (
        <Layout>
            <div className="p-16">
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Layout>
    )

}

export async function getStaticProps() {

    const filePath = path.join(process.cwd(), "legal/2257ComplianceStatement.md")
    const content = fs.readFileSync(filePath, "utf8")

    const converter = new showdown.Converter()
    const html = converter.makeHtml(content)

    return {
        props: {
            html
        }
    }

}

export default From2275