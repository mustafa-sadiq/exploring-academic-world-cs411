import db
import dash
from dash import dcc, html
import dash_bootstrap_components as dbc
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

class MainApp:
    def __init__(self):
        self.db = db.DBUtil(
            mysql_config={'host': 'localhost', 'database': 'academicworld', 'user': 'root', 'password': 'eh-Lw5/TBxMW[4kS'},
            mongodb_config={'host': 'localhost', 'port': 27017},
            neo4j_config={'uri': 'bolt://localhost:7687', 'auth': ('neo4j', 'ilovecs411')}
            )
        
    def get_top_keywords(self, year=None):
        if year:
            query = """
                SELECT k.name, COUNT(pk.publication_id) as publication_count
                FROM keyword k
                JOIN publication_keyword pk ON k.id = pk.keyword_id
                JOIN publication p ON pk.publication_id = p.ID
                WHERE p.year = %s
                GROUP BY k.name
                ORDER BY publication_count DESC
                LIMIT 10;
            """

            result = self.db.perform_mysql_operation(query, (year,))

        else:
            query = """
            SELECT k.name, COUNT(pk.publication_id) as publication_count
            FROM keyword k
            JOIN publication_keyword pk ON k.id = pk.keyword_id
            JOIN publication p ON pk.publication_id = p.ID
            GROUP BY k.name
            ORDER BY publication_count DESC
            LIMIT 100;
            """
            result = self.db.perform_mysql_operation(query)

        return pd.DataFrame(result, columns=['Keyword', 'Publication Count'])

    def run(self):
        # Initialize Dash app
        app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

        # Define layout
        app.layout = dbc.Container([

            html.Div(id='output-state'),

            dbc.Row(
            dbc.Col(
                html.H1('Mustafa Sadiq CS411 project - Exploring academic world', className='text-center'),
                width=12
            )
            ),
            dbc.Row([
            dbc.Row(html.H1('Live Counts:', className='m-3 p-3'), className='w-100'),
            dbc.Col([
                html.H3('University Count:'),
                html.H4(id='university-counts', className='text-primary')
            ], md=3),
            dbc.Col([
                html.H3('Faculty Count:'),
                html.H4(id='faculty-counts', className='text-primary')
            ], md=3),
            dbc.Col([
                html.H3('Faculty Keyword Count:'),
                html.H4(id='faculty-keyword-counts', className='text-primary')
            ], md=3),
            dbc.Col([
                html.H3('Faculty Publication Count:'),
                html.H4(id='faculty-publication-counts', className='text-primary')
            ], md=3),
            dbc.Col([
                html.H3('Keyword Count:'),
                html.H4(id='keyword-counts', className='text-primary')
            ], md=6),
            dbc.Col([
                html.H3('Publication Count:'),
                html.H4(id='publication-counts', className='text-primary')
            ], md=6),
            dbc.Col([
                html.H3('Publication Keyword Count:'),
                html.H4(id='publication-keyword-counts', className='text-primary')
            ], md=6),
            ], className='m-3 p-3 border'),
            dbc.Row(
            dbc.Col(
                html.Div([
                html.H3('Faculty that dont have any publication:'),
                html.Div(id="faculty-no-publication", className='text-primary', style={'height': '300px', 'overflowY': 'scroll'})
                ]),
                width=12
            ),
            className='m-3 p-3 border'
            ),
            dbc.Row(
            dbc.Col(
                html.Div([
                html.H3('Top Keywords by Publication Count'),
                dcc.Dropdown(
                    id='year-dropdown',
                    options=[{'label': str(year), 'value': str(year)} for year in range(2000, 2023)],
                    placeholder="Select a year",
                    style={'width': '50%'}
                ),
                dcc.Graph(id='top-keyword-bar-chart')
                ]),
                width=12
            ),
            className='m-3 p-3 border'
            ),
            dbc.Row([
            dbc.Col([
                html.H3('Neo4j Dashboard'),
                dcc.Dropdown(id='keyword-dropdown', placeholder='Select a keyword'),
                dcc.Graph(id='graph-visualization'),
                html.Div(id='table-container')
            ], width=12)
            ]),
            dbc.Row(
            [
                dbc.Col(
                dbc.Card(
                    [
                    dbc.CardBody(
                        [
                        html.H3("Temporary Text 4"),
                        html.P("TO BE IMPLEMENTED"),
                        ]
                    )
                    ]
                ),
                width=6,
                ),
                dbc.Col(
                dbc.Card(
                    [
                    dbc.CardBody(
                        [
                        html.H3("Temporary Text 5"),
                        html.P("TO BE IMPLEMENTED"),
                        ]
                    )
                    ]
                ),
                width=6,
                ),
            ],
            className="m-3 p-3 border",
            ),
            dcc.Interval(
            id='interval-component',
            interval=10000,  # in milliseconds
            n_intervals=0
            )
        ], className='m-3 p-3 border', fluid=True)

        @app.callback(
            [dash.dependencies.Output('faculty-counts', 'children'),
             dash.dependencies.Output('faculty-keyword-counts', 'children'),
             dash.dependencies.Output('faculty-publication-counts', 'children'),
             dash.dependencies.Output('keyword-counts', 'children'),
             dash.dependencies.Output('publication-counts', 'children'),
             dash.dependencies.Output('publication-keyword-counts', 'children'),
             dash.dependencies.Output('university-counts', 'children'),
             dash.dependencies.Output('faculty-no-publication', 'children'),],
            [dash.dependencies.Input('interval-component', 'n_intervals'),]
        )
        def update_counts(n_intervals):
            faculty_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM faculty")[0][0]
            faculty_keyword_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM faculty_keyword")[0][0]
            faculty_publication_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM faculty_publication")[0][0]
            keyword_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM keyword")[0][0]
            publication_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM publication")[0][0]
            publication_keyword_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM publication_keyword")[0][0]
            university_counts = self.db.perform_mysql_operation("SELECT COUNT(*) FROM university")[0][0]
            faculty_no_publication_tuples = self.db.perform_mysql_operation("SELECT name FROM faculty WHERE id NOT IN (SELECT faculty_id FROM faculty_publication)")

            faculty_no_publication = [name[0] for name in faculty_no_publication_tuples]
            faculty_no_publication_elements = [html.Div(name) for name in faculty_no_publication]
            
            return (faculty_counts, 
                    faculty_keyword_counts, 
                    faculty_publication_counts, 
                    keyword_counts, 
                    publication_counts, 
                    publication_keyword_counts, 
                    university_counts, 
                    html.Div(faculty_no_publication_elements),) 

        @app.callback(
            dash.dependencies.Output('top-keyword-bar-chart', 'figure'),
            [dash.dependencies.Input('interval-component', 'n_intervals'),
            dash.dependencies.Input('year-dropdown', 'value')]
        )
        def update_top_keyword_bar_chart(n_intervals, selected_year):
            df = self.get_top_keywords(selected_year)
            fig = px.bar(df, x='Keyword', y='Publication Count', title='Top 10 Keywords by Publication Count')
            return fig          
    

        # Run the app
        app.run_server(debug=True)

if __name__ == '__main__':
    app = MainApp()
    app.run()