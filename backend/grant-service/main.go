package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"

	pb "github.com/MahikaJaguste/grant-management-system/proto/grant"
	_ "github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
)

// GrantServiceServer implements the gRPC service
type GrantServiceServer struct {
	pb.UnimplementedGrantServiceServer
	DB *sql.DB
}

// CreateGrant handles grant submission requests
func (s *GrantServiceServer) CreateGrant(ctx context.Context, req *pb.GrantRequest) (*pb.GrantResponse, error) {
	// Insert into MySQL
	query := "INSERT INTO grants (professor_id, title, description, requested_funding, status) VALUES (?, ?, ?, ?, ?)"
	result, err := s.DB.Exec(query, req.ProfessorId, req.Title, req.Description, req.RequestedFunding, "Pending Review")
	if err != nil {
		return nil, err
	}
	grantID, _ := result.LastInsertId()

	return &pb.GrantResponse{
		GrantId: fmt.Sprintf("%d", grantID),
		Status:  "Pending Review",
	}, nil
}

func main() {
	// Connect to MySQL
	// TODO Take these credentials from environment variables
	dsn := "root:password@tcp(localhost:3306)/grants_db"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Start gRPC server
	listener, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterGrantServiceServer(grpcServer, &GrantServiceServer{DB: db})

	log.Println("Grant Service running on port 50052...")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
