from pymongo import MongoClient
from neo4j import GraphDatabase

import mysql.connector

class DBUtil:
    def __init__(self, mysql_config, mongodb_config, neo4j_config):
        self.mysql_config = mysql_config
        self.mongodb_config = mongodb_config
        self.neo4j_config = neo4j_config

    def connect_mysql(self):
        try:
            connection = mysql.connector.connect(**self.mysql_config)
            print("Connected to MySQL database")
            return connection
        except mysql.connector.Error as error:
            print("Failed to connect to MySQL database:", error)
            return None

    def connect_mongodb(self):
        try:
            client = MongoClient(**self.mongodb_config)
            print("Connected to MongoDB")
            return client
        except Exception as error:
            print("Failed to connect to MongoDB:", error)
            return None

    def connect_neo4j(self):
        try:
            driver = GraphDatabase.driver(**self.neo4j_config)
            print("Connected to Neo4j database")
            return driver
        except Exception as error:
            print("Failed to connect to Neo4j database:", error)
            return None

    def perform_mysql_operation(self, query, args=None):
        connection = self.connect_mysql()
        if connection:
            try:
                cursor = connection.cursor()
                if args:
                    cursor.execute(query, args)
                else:
                    cursor.execute(query)
                result = cursor.fetchall()
                cursor.close()
                connection.close()
                return result
            except mysql.connector.Error as error:
                print("Failed to perform MySQL operation:", error)
                return None

    def perform_mongodb_operation(self, collection_name, query):
        client = self.connect_mongodb()
        if client:
            try:
                db = client.get_database()
                collection = db.get_collection(collection_name)
                result = collection.find(query)
                client.close()
                return result
            except Exception as error:
                print("Failed to perform MongoDB operation:", error)
                return None

    def perform_neo4j_operation(self, query):
        driver = self.connect_neo4j()
        if driver:
            try:
                with driver.session() as session:
                    full_query = f"USE academicworld {query}"
                    result = session.run(full_query)
                    records = list(result)  # Fetch all records immediately
                    return records
            except Exception as error:
                print("Failed to perform Neo4j operation:", error)
                return None